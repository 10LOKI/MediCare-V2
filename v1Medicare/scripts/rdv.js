// L-iyam dial l-osobo3 (khasshom ykono b7al dial l-admin)
const JOURS_SEMAINE = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

document.addEventListener('DOMContentLoaded', () => {

    // L-Elements l-assassia
    const form = document.getElementById('appointmentForm');
    const doctorSelect = document.getElementById('doctor');
    const daysContainer = document.getElementById('daysOfWeekContainer');
    const daysError = document.getElementById('daysError');
    
    // === 1. N-CHARGIW LES MÉDECINS F L-DROPDOWN ===
    // Mola7aḍa: T2ekked mn had l-path. 
    // L-HTML dialek (rendez-vous.html) howa l-assas.
    // Ila l-HTML kayn f "pages/" o l-JSON f "scripts/",
    // l-path s7i7 howa: '../scripts/Doctors-v2.json'
    
    fetch('../../v2Medicare/scripts/Doctors-v2.json') // <-- T2EKKED MN HAD L-PATH
        .then(response => {
            if (!response.ok) throw new Error(`Erreur réseau: ${response.status}`);
            return response.json();
        })
        .then(data => {            doctorSelect.innerHTML = '<option value="">Sélectionnez un médecin</option>';
            data.doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id; // L-VALUE HOWA L-ID
                option.textContent = `${doctor.name} (${doctor.specialty})`;
                doctorSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Mochkil f chargement dial les médecins:", error);
            doctorSelect.innerHTML = '<option value="">Erreur chargement médecins</option>';
            doctorSelect.disabled = true;
        });

    // === 2. Melli l-User ykhtar tbib, nwerriw l-disponibilité dialo ===
    doctorSelect.addEventListener('change', () => {
        const medcinId = doctorSelect.value;
        daysContainer.innerHTML = '';
        daysError.classList.add('hidden'); // Nkhbbiw l-erreur

        if (!medcinId) {
            daysContainer.innerHTML = '<p class="text-gray-400 text-sm col-span-full">Veuillez d\'abord sélectionner un médecin.</p>';
            return;
        }

        // ***** HNA L-BLAN (L-LOGIC) *****
        // Njbdo l-dispo dial tbib mn localStorage (b nefs l-key dial l-admin)
        const dispo = JSON.parse(localStorage.getItem(`dispo_${medcinId}`)) || [];

        if (dispo.length === 0) {
            daysContainer.innerHTML = '<p class="text-red-400 text-sm col-span-full">Ce médecin n\'a pas de jours disponibles pour le moment.</p>';
            return;
        }

        // N-creyiw l-checkboxes
        JOURS_SEMAINE.forEach(jour => {
            const label = document.createElement('label');
            label.className = 'flex items-center space-x-2 cursor-pointer p-3 rounded-lg bg-gray-700/50 border-2 border-gray-600 transition-all';
            
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'jours';
            input.value = jour;
            input.className = 'form-checkbox h-5 w-5 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500/50';

            const span = document.createElement('span');
            span.className = 'text-gray-200 select-none';
            span.textContent = jour;

            // HNA L-LOGIC: Ila l-jour kayn f l-dispo, nkhliw l-checkbox. Ila ma kaynch, n-desactiviwh
            if (dispo.includes(jour)) {
                label.classList.add('hover:border-blue-500');
            } else {
                input.disabled = true;
                label.classList.add('opacity-40', 'cursor-not-allowed');
                span.classList.add('line-through'); // Nderbo 3lih khet
            }

            label.appendChild(input);
            label.appendChild(span);
            daysContainer.appendChild(label);
        });
    });

    // === 3. VALIDATION (L-CODE DIALEK L-QDIM + TBEDDILAT) ===
    
    // L-Code dial 'dateInput' mabqach khdam 7it 7eyyedna l-input dial date
    // const dateInput = document.getElementById('date');
    // const today = new Date().toISOString().split('T')[0];
    // dateInput.min = today;

    // 7eyyedna 'date' o 'time' mn l-lista dial l-inputs li khasshom validation
    const inputs = form.querySelectorAll('input[required], select[required]');

    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        let isValid = true;
        let message = '';
        
        switch(field.id) {
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
                // Nbeddel regex l wa7da 3amma chwiya
                const phoneRegex = /^(\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$|^\d{10}$|^0[5-7]\d{8}$/;
                if (!phoneRegex.test(field.value.trim().replace(/[\s.-]/g, ''))) {
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
            // 7eyyedna validation dial 'date' o 'time'
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

    // === 4. SUBMIT L-FORM (B TBEDDILAT) ===
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isFormValid = true;
        
        // N-valideriw l-inputs l-3adiyin
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        // N-valideriw l-iyam (Jours)
        const checkedDays = daysContainer.querySelectorAll('input[name="jours"]:checked:not(:disabled)');
        if (checkedDays.length === 0) {
            isFormValid = false;
            daysError.textContent = 'Veuillez sélectionner au moins un jour disponible.';
            daysError.classList.remove('hidden');
        } else {
            daysError.classList.add('hidden');
        }

        if (!isFormValid) {
            return;
        }

        // Njem3o l-iyam li t-checkaw
        const selectedDays = [];
        checkedDays.forEach(cb => {
            selectedDays.push(cb.value);
        });
        
        // N-sauvegardiw smit tbib machi ghir l-ID
        const doctorText = doctorSelect.options[doctorSelect.selectedIndex].text;

        const formData = {
            id: Date.now(),
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            doctor: doctorText, // Smit tbib
            doctor_id: document.getElementById('doctor').value, // L-ID dialo
            jours: selectedDays, // *** HADA HOWA L-ELEMENT JDID ***
            reason: document.getElementById('reason').value.trim(),
            createdAt: new Date().toISOString()
            // 7eyyedna 'date' o 'time'
        };

        saveAppointment(formData);
        showModal();
        form.reset();
        // Nrej3o l-blassa dial l-iyam kif kant
        daysContainer.innerHTML = '<p class="text-gray-400 text-sm col-span-full">Veuillez d\'abord sélectionner un médecin.</p>';
        displayAppointments();
    });

    // === 5. AFFICHAGE O SUPPRESSION (B TBEDDILAT) ===
    
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
            
            // Nbeddlo l-affichage bach ywerri l-iyam
            let dateInfo = '';
            if (apt.jours && apt.jours.length > 0) {
                // Ila l-RDV jdid fih l-iyam
                dateInfo = `<p class="text-blue-400 text-sm">Jours: ${apt.jours.join(', ')}</p>`;
            } else if (apt.date && apt.time) {
                // Ila l-RDV qdim (bach maytrteqch l-code)
                const dateFormatted = new Date(apt.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                dateInfo = `<p class="text-blue-400 text-sm">${dateFormatted} à ${apt.time}</p>`;
            }

            aptCard.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="text-lg font-bold text-white">${apt.doctor}</h3>
                        ${dateInfo}                    </div>
                    <button onclick="deleteAppointment(${apt.id})" 
                        class="text-red-400 hover:text-red-300 transition-colors duration-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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

    // === 6. MODAL (Functions khasshom ykono global) ===
    // L-code dialek l-qdim kan fih l-onclick f HTML, dakchi 3lach khass hado ykono f "window"
    
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
        }, 300);
    }

    document.getElementById('successModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
   }.bind(this)); // Zedt .bind(this) l-safety, wakha tkhdem bla biha

    // N-affiche-iw les RDV l-qdam melli t-charge l-page
    displayAppointments();
});