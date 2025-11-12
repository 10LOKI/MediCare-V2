document.addEventListener('DOMContentLoaded', () => {
    
    const doctorSelect = document.getElementById('doctor');
    const availabilityContainer = document.getElementById('availabilityContainer');
    const daysRadioGroup = document.getElementById('daysRadioGroup');
    const storedDoctors = localStorage.getItem('doctors');

    if (storedDoctors) {
        const doctors = JSON.parse(storedDoctors);
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = `${doctor.name} - ${doctor.specialty}`;
            option.classList.add('text-black');
            doctorSelect.appendChild(option);
        });
    } else {
        console.error('Mal9inach "doctors" f localStorage.');
        const errorOption = document.createElement('option');
        errorOption.textContent = 'Erreur: Liste des médecins non trouvée';
        errorOption.disabled = true;
        doctorSelect.appendChild(errorOption);
    }

    doctorSelect.addEventListener('change', () => {
        const selectedDoctorId = doctorSelect.value;
        
        daysRadioGroup.innerHTML = ''; 
        availabilityContainer.classList.add('hidden');
        
        if (!selectedDoctorId) {
            return;
        }

        const availabilityKey = `availability_${selectedDoctorId}`;
        const availableDays = JSON.parse(localStorage.getItem(availabilityKey) || '[]');
        
        const errorMsg = availabilityContainer.querySelector('.error-message');

        if (availableDays.length > 0) {
            availableDays.forEach((day, index) => {
                const radioWrapper = document.createElement('div');
                radioWrapper.className = 'flex items-center';

                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.id = `day_${index}`;
                radioInput.name = 'appointmentDay';
                radioInput.value = day;
                radioInput.required = true; 
                radioInput.className = 'w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500';

                const radioLabel = document.createElement('label');
                radioLabel.htmlFor = `day_${index}`;
                radioLabel.textContent = day;
                radioLabel.className = 'ml-2 text-sm font-medium text-gray-300';

                radioWrapper.appendChild(radioInput);
                radioWrapper.appendChild(radioLabel);
                daysRadioGroup.appendChild(radioWrapper);
            });
            
            availabilityContainer.classList.remove('hidden');
            errorMsg.classList.add('hidden');

        } else {
            errorMsg.textContent = "Ce médecin n'a pas de disponibilités pour le moment.";
            errorMsg.classList.remove('hidden');
            availabilityContainer.classList.remove('hidden'); 
        }
    });

    const form = document.getElementById('appointmentForm');
    const inputs = form.querySelectorAll('input[required]'); 

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
                const phoneRegex = /^(06|07|05)\d{8}$/;
                if (!phoneRegex.test(field.value.trim())) {
                    isValid = false;
                    message = 'Format valide: 0612345678 (10 chiffres)';
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

    doctorSelect.addEventListener('blur', () => validateSelect(doctorSelect));
    doctorSelect.addEventListener('change', () => validateSelect(doctorSelect));

    function validateSelect(selectField) {
        const formGroup = selectField.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        if (!selectField.value) {
            errorMessage.textContent = 'Veuillez sélectionner un médecin';
            errorMessage.classList.remove('hidden');
            return false;
        } else {
            errorMessage.classList.add('hidden');
            return true;
        }
    }

    function validateDays() {
        const formGroup = availabilityContainer.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
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
    daysRadioGroup.addEventListener('change', validateDays);


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!validateSelect(doctorSelect)) isFormValid = false;
        if (!validateDays()) isFormValid = false;
        
        if (!isFormValid) {
            return;
        }
        
        const selectedDay = daysRadioGroup.querySelector('input[name="appointmentDay"]:checked').value;
        const selectedDoctorName = doctorSelect.options[doctorSelect.selectedIndex].text;

        const formData = {
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
        
        saveAppointment(formData);
        showModal();
        form.reset();
        
        availabilityContainer.classList.add('hidden');
        daysRadioGroup.innerHTML = '';
        
        displayAppointments();
    });

    function saveAppointment(appointment) {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }
    
    function displayAppointments() {
        const appointments = JSON.parse(localStorage.appointments || '[]');
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
            
            aptCard.innerHTML = `
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h3 class="text-lg font-bold text-white">${apt.doctor}</h3>
                            <p class="text-blue-400 text-sm">Jour demandé: ${apt.day}</p>
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
                        <p><span class="text-gray-400">Jour demandé:</span> ${apt.day}</p>
                        <p><span class="text-gray-400">Téléphone:</span> ${apt.phone}</p>
                        ${apt.reason ? `<p class="mt-2"><span class="text-gray-400">Motif:</span> ${apt.reason}</p>` : ''}
                        <p class="mt-2"><span class="text-gray-400">Status:</span> ${apt.statusRdv}</p>
                    </div>
                    `;

            container.appendChild(aptCard);
        });
    }
    
    window.deleteAppointment = function(id) {
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
        }, 10);
    }
    
    window.closeModal = function() {
        const modal = document.getElementById('successModal');
        const modalContent = document.getElementById('modalContent');

        modalContent.style.transform = 'scale(0.95)';
        modalContent.style.opacity = '0';

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 100);
    }
    
    document.getElementById('successModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    displayAppointments();

});