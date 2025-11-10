const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;
const form = document.getElementById('appointmentForm');
const inputs = form.querySelectorAll('input[required], select[required]');
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
            const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
            if (!phoneRegex.test(field.value.trim())) {
                isValid = false;
                message = 'Veuillez entrer un numéro de téléphone valide';
            }
            break;

        case 'doctor':
            if (!field.value) {
                isValid = false;
                message = 'Veuillez sélectionner un médecin';
            }
            break;

        case 'date':
            if (!field.value) {
                isValid = false;
                message = 'Veuillez sélectionner une date';
            } else if (new Date(field.value) < new Date(today)) {
                isValid = false;
                message = 'La date ne peut pas être dans le passé';
            }
            break;

        case 'time':
            if (!field.value) {
                isValid = false;
                message = 'Veuillez sélectionner une heure';
            }
            break;
    }
    if (!isValid) {
        field.classList.remove('border-gray-600');
        field.classList.add('border-red-500');
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    } else {
        field.classList.remove('border-red-500');
        field.classList.add('border-gray-600');
        errorMessage.classList.add('hidden');
    }

    return isValid;
}
inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
        if (input.classList.contains('border-red-500')) {
            validateField(input);
        }
    });
});
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        return;
    }
    // thi is me
    const formData = {
        id: Date.now(),
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        doctor: document.getElementById('doctor').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        reason: document.getElementById('reason').value.trim(),
        createdAt: new Date().toISOString()
    };
    saveAppointment(formData);
    showModal();
    form.reset();
    displayAppointments();
});
function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
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

    appointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach(apt => {
        const aptCard = document.createElement('div');
        aptCard.className = 'bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300';

        const dateFormatted = new Date(apt.date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        aptCard.innerHTML = `
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h3 class="text-lg font-bold text-white">${apt.doctor}</h3>
                            <p class="text-blue-400 text-sm">${dateFormatted} à ${apt.time}</p>
                        </div>
                        <button onclick="deleteAppointment(${apt.id})" 
                            class="text-red-400 hover:text-red-300 transition-colors duration-300">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="text-gray-300 text-sm space-y-1">
                        <p><span class="text-gray-400">Patient:</span> ${apt.fullName}</p>
                        <p><span class="text-gray-400">Email:</span> ${apt.email}</p>
                        <p><span class="text-gray-400">Téléphone:</span> ${apt.phone}</p>
                        ${apt.reason ? `<p class="mt-2"><span class="text-gray-400">Motif:</span> ${apt.reason}</p>` : ''}
                    </div>
                `;

        container.appendChild(aptCard);
    });
}
function deleteAppointment(id) {
    if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments = appointments.filter(apt => apt.id !== id);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
    }
}
function showModal() {
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('modalContent');

    modal.classList.remove('hidden');
    modal.style.cursor = 'pointer';
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 1000);
}
function closeModal() {
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}
document.getElementById('successModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});
displayAppointments();
//------------------------------------------------------- Rendez-vous V2 ----------------------------------------------------------------


let list_Rendez_Vous = document.querySelector("#tbody")

// const wizards = ['Hermione', 'Neville', 'Gandalf'];
// const app = document.querySelector('#app');
// list_Rendez_Vous.innerHTML = '<tr>' + arr.map(item => `<td>${values}</td>`).join('') + '</tr>';


function listRendezVous() {
    list_Rendez_Vous.innerHTML = `
    '<tr class="border-b border-gray-200 dark:border-gray-700">' + arr.map(item => ' + ' <td class="px-6 py-4">${values}</td>).join('')/' + '</tr>'`;
}


function refuseAppointment(id) {
    if (confirm('Êtes-vous sûr reject cette rendez-vous ?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments = appointments.filter(apt => apt.id !== id);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
    }
}
function acceptAppointment(id) {
    if (confirm('Êtes-vous sûr accept cette rendez-vous ?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments = appointments.filter(apt => apt.id !== id);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
    }
}
// if (localStorage.email == null) {
//     localStorage.setItem("email", "hey@email.com")
//     localStorage.setItem("pass", "12345")
// }

// let logOut = document.querySelector(".logOut").addEventListener('click', () => {
//     localStorage.removeItem("email")
//     localStorage.removeItem("pass")
//     localStorage.removeItem("loginIs")
//     location.href = '../../../v3Medicare/pages/loginPage.html';
// })

/*
<tr class="border-b border-gray-200 dark:border-gray-700">
        <th scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
            Apple MacBook Pro 17"
        </th>
        <td class="px-6 py-4">
            Silver
        </td>
        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
            Laptop
        </td>
        <td class="px-6 py-4">
            $2999
        </td>
    </tr>
*/