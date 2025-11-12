const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

const form = document.getElementById('appointmentForm');
const inputs = form.querySelectorAll('input[required], select[required]');
const doctorSelect = document.getElementById('doctors');
const availabilityContainer = document.getElementById('availabilityContainer');
const daysRadioGroup = document.getElementById('daysRadioGroup');

function getDoctors() {//v2 
    const doctors = JSON.parse(localStorage.doctors || '[]')
    let docteurs = document.getElementById('doctors')
    for (let item = 0; item < doctors.length; item++) {
        docteurs.innerHTML += <option value="${doctors[item].name}" class="text-center text-bold text-xl bg-gray-600 w-80"> ${doctors[item].name} - ${doctors[item].specialty} </option>;
    }
}
getDoctors()


function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';

    switch (field.id) {
        case 'fullName':
            if (field.value.trim().length < 2) {
                isValid = false;
                message = 'Le nom doit contenir au moins 2 caractères';
            } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(field.value.trim())) {
                isValid = false;
                message = 'Le nom ne peut contenir que des lettres';
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                message = 'Veuillez entrer une adresse email valide';
            }
            break;

        case 'phone':
            const phoneRegex = /^(05|06|07)\d{8}$/;
            if (!phoneRegex.test(field.value.trim())) {
                isValid = false;
                message = 'Format valide: 0612345678 (10 chiffres)';
            }
            break;
    }

    if (!isValid) {
        field.classList.add('border-red-500');
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    } else {
        field.classList.remove('border-red-500');
        errorMessage.classList.add('hidden');
    }

    return isValid;
}

function validateDays() {
    const errorMessage = availabilityContainer.querySelector('.error-message');
    const checkedDay = daysRadioGroup.querySelector('input[name="appointmentDay"]:checked');

    if (availabilityContainer.classList.contains('hidden') || !doctorSelect.value) {
        errorMessage.classList.add('hidden');
        return true;
    }

    if (!checkedDay) {
        errorMessage.textContent = 'Veuillez sélectionner un jour';
        errorMessage.classList.remove('hidden');
        return false;
    } else {
        errorMessage.classList.add('hidden');
        return true;
    }
}

// -------------------- HANDLE DOCTOR CHANGE --------------------
doctorSelect.addEventListener('change', () => {
    const selectedDoctorId = doctorSelect.value;

    daysRadioGroup.innerHTML = '';
    availabilityContainer.classList.add('hidden');

    if (!selectedDoctorId) return;

    const availabilityKey = `availability_${selectedDoctorId}`;
    const availableDays = JSON.parse(localStorage.getItem(availabilityKey) || '[]');
    const errorMsg = availabilityContainer.querySelector('.error-message');

    if (availableDays.length > 0) {
        availableDays.forEach((day, i) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'flex items-center';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'appointmentDay';
            radio.id = `day_${i}`;
            radio.value = day;
            radio.required = true;
            radio.className = 'w-4 h-4 text-blue-600 focus:ring-blue-500';

            const label = document.createElement('label');
            label.htmlFor = `day_${i}`;
            label.textContent = day;
            label.className = 'ml-2 text-sm text-gray-300';

            wrapper.appendChild(radio);
            wrapper.appendChild(label);
            daysRadioGroup.appendChild(wrapper);
        });

        availabilityContainer.classList.remove('hidden');
        errorMsg.classList.add('hidden');
    } else {
        errorMsg.textContent = "Ce médecin n'a pas de disponibilités pour le moment.";
        errorMsg.classList.remove('hidden');
        availabilityContainer.classList.remove('hidden');
    }
});

// -------------------- SUBMIT --------------------
form.addEventListener('submit', e => {
    e.preventDefault();

    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) isFormValid = false;
    });
    if (!validateDays()) isFormValid = false;

    if (!isFormValid) return;

    const selectedDay = daysRadioGroup.querySelector('input[name="appointmentDay"]:checked').value;
    const selectedDoctorOption = doctorSelect.options[doctorSelect.selectedIndex];
    const selectedDoctorName = selectedDoctorOption.text;

    const appointment = {
        id: Date.now(),
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        doctor: selectedDoctorName,
        day: selectedDay,
        reason: document.getElementById('reason').value.trim(),
        createdAt: new Date().toISOString(),
        statusRdv: "Traitement"
    };

    saveAppointment(appointment);
    showModal();
    form.reset();

    availabilityContainer.classList.add('hidden');
    daysRadioGroup.innerHTML = '';

    displayAppointments();
});

// -------------------- localsorage set --------------------
function saveAppointment(appointment) {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const container = document.getElementById('appointmentsContainer');
    const listSection = document.getElementById('appointmentsList');

    if (appointments.length === 0) {
        listSection.classList.add('hidden');
        return;
    }

    listSection.classList.remove('hidden');
    container.innerHTML = '';

    appointments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .forEach(apt => {
            const aptCard = document.createElement('div');
            aptCard.className = 'bg-gray-800/50 p-6 rounded-2xl border border-blue-500/20';

            aptCard.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="text-lg font-bold text-white">${apt.doctor}</h3>
                        <p class="text-blue-400 text-sm">${apt.day}</p>
                    </div>
                    <button onclick="deleteAppointment(${apt.id})" class="text-red-400 hover:text-red-300">
                        🗑
                    </button>
                </div>
                <div class="text-gray-300 text-sm space-y-1">
                    <p><span class="text-gray-400">Patient:</span> ${apt.fullName}</p>
                    <p><span class="text-gray-400">Email:</span> ${apt.email}</p>
                    <p><span class="text-gray-400">Téléphone:</span> ${apt.phone}</p>
                    ${apt.reason ? `<p><span class="text-gray-400">Motif:</span> ${apt.reason}</p>` : ''}
                    <p><strong>Status:</strong> ${apt.statusRdv}</p>
                </div>
            `;
            container.appendChild(aptCard);
        });
}

function deleteAppointment(id) {
    if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments = appointments.filter(a => a.id !== id);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
    }
}

// -------------------- MODAL med --------------------
function showModal() {
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('modalContent');

    modal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('modalContent');
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';
    setTimeout(() => modal.classList.add('hidden'), 100);
}

document.getElementById('successModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
});

displayAppointments();
