document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.bd').innerHTML = `
     <header class="w-full h-[50px] flex items-center relative justify-center z-50">
        <nav class="w-[90%] flex h-25 justify-around items-center ">
            <a href="../index.html">
                <div class="text-white font-bold">MED <span class="font-bold text-blue-500">Care+</span></div>
            </a>

            <a class="text-[#eee]  hover:text-blue-500" href="medecins.html">Médecins</a>
            <a class="text-blue-500 font-semibold" href="rendez-vous.html">Rendez-vous</a>
            <form class="form relative">
                <button class="absolute left-2 -translate-y-1/2 top-1/2 p-1" type="search">
                    <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
                        aria-labelledby="search" class="w-5 h-5 text-gray-700">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                            stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </svg>
                </button>
                <input id="searchInput"
                    class="input rounded-full px-8 py-1 text-blue-500 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                    placeholder="Rechercher..." type="text" />
                <button type="reset" class="absolute right-3 -translate-y-1/2 top-1/2 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </form>
        </nav>
    </header>

    <div class="max-w-[80%] mx-auto mt-20 mb-8">
        <div class="text-center">
            <span class="px-6 py-2 text-sm font-bold tracking-widest bg-blue-500/20 rounded-full border border-blue-400/40 text-blue-300 uppercase">
                Réservation en Ligne
            </span>
            <h1 class="font-extrabold text-5xl md:text-6xl lg:text-7xl mt-6 mb-4 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                Prendre Rendez-vous
            </h1>
            <p class="text-gray-300 text-lg max-w-2xl mx-auto">
                Réservez votre consultation en quelques clics. Nos médecins sont disponibles pour vous accompagner.
            </p>
        </div>
    </div>

    <div class="flex justify-center items-start pb-20 px-4">
        <div class="w-full max-w-2xl">
            <div class="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-blue-500 shadow-lg shadow-teal-800 ">
                <form id="appointmentForm" class="space-y-6">
                    <div class="form-group">
                        <label for="fullName" class="block text-sm font-semibold text-gray-200 mb-2">
                            Nom complet *
                        </label>
                        <input type="text" id="fullName" name="fullName" required
                            class="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300">
                        <p class="error-message hidden text-red-400 text-sm mt-1"></p>
                    </div>
                    <div class="form-group">
                        <label for="email" class="block text-sm font-semibold text-gray-200 mb-2">
                            Adresse email *
                        </label>
                        <input type="email" id="email" name="email" required
                            class="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300">
                        <p class="error-message hidden text-red-400 text-sm mt-1"></p>
                    </div>
                    <div class="form-group">
                        <label for="phone" class="block text-sm font-semibold text-gray-200 mb-2">
                            Téléphone *
                        </label>
                        <input type="tel" id="phone" name="phone" required
                            placeholder="06 12 34 56 78"
                            class="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300">
                        <p class="error-message hidden text-red-400 text-sm mt-1"></p>
                    </div>
                    <div class="form-group">
                        <label for="doctor" class="block text-sm font-semibold text-gray-200 mb-2">
                        </label>
                        <select id="doctor" name="doctor" required
                            class="w-full ...">
                            <option value="" class="text-black">Sélectionnez un médecin</option>
                        </select>
                        <p class="error-message hidden text-red-400 text-sm mt-1"></p>
                    </div>
                    <div id="availabilityContainer" class="form-group hidden">
                    <label class="block text-sm font-semibold text-gray-200 mb-2">
                    Jour disponible *
                    </label>
                    <div id="daysRadioGroup" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    </div>
                    <p class="error-message hidden text-red-400 text-sm mt-1"></p>
                    </div>
                    <div class="form-group">
                        <label for="reason" class="block text-sm font-semibold text-gray-200 mb-2">
                            Motif de consultation
                        </label>
                        <textarea id="reason" name="reason" rows="4"
                            placeholder="Décrivez brièvement le motif de votre consultation..."
                            class="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"></textarea>
                    </div>
                    <button type="submit" 
                        class="w-full bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-500/50 transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
                        Confirmer le rendez-vous
                    </button>
                </form>
            </div>
            <div id="appointmentsList" class="mt-8 space-y-4 hidden">
                <h2 class="text-2xl font-bold text-white mb-4">Mes rendez-vous</h2>
                <div id="appointmentsContainer" class="space-y-3"></div>
            </div>
        </div>
    </div>
    <div id="successModal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div class="bg-gray-800 rounded-3xl p-8 max-w-md w-full border border-blue-500/20 shadow-2xl transform scale-95 opacity-0 transition-all duration-300" id="modalContent">
            <div class="text-center">
                <div class="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">Rendez-vous confirmé !</h3>
                <p class="text-gray-300 mb-6">Votre rendez-vous a été enregistré avec succès. Vous recevrez une confirmation par email.</p>
                <button onclick="closeModal()" 
                    class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300">
                    Fermer
                </button>
            </div>
        </div>
    </div>
    `
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