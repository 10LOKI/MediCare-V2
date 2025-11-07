// Jours de la semaine
const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

document.addEventListener('DOMContentLoaded', () => {
    
    fetch('../scripts/Doctors-v2.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(jsonData => {
            // 1. CIBLER VOTRE DIV EXISTANTE
            const container = document.getElementById('medecinCards');
            if (!container) {
                console.error("Erreur : Le conteneur #medecinCards n'a pas été trouvé.");
                return;
            }

            // 2. PRÉPARER LE CONTENEUR
            container.classList.add('p-6', 'h-full', 'overflow-y-auto');
            container.innerHTML = '<h1 class="text-2xl font-bold text-gray-900 mb-6">Gérer les Disponibilités (US6)</h1>';
            
            const cardsList = document.createElement('div');
            cardsList.className = 'space-y-6';
            container.appendChild(cardsList);

            // -----------------------------------------------------------------
            // 3. GÉNÉRER LES CARTES MÉDECINS (US6) - Version createElement
            // -----------------------------------------------------------------
            jsonData.doctors.forEach(doctor => {
                const savedAvail = JSON.parse(localStorage.getItem(`availability_${doctor.id}`)) || [];

                // Créer la carte principale
                const doctorDiv = document.createElement('div');
                doctorDiv.className = 'bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200';

                // --- Créer la rangée du haut ---
                const topRowDiv = document.createElement('div');
                topRowDiv.className = 'flex flex-col md:flex-row md:items-center md:justify-between';

                // --- Créer la partie infos (nom + spécialité) ---
                const infoDiv = document.createElement('div');
                
                const title = document.createElement('h3');
                title.className = 'text-lg font-semibold text-gray-900';
                title.textContent = doctor.name; // Utiliser .textContent est plus sûr
                
                const specialty = document.createElement('p');
                specialty.className = 'text-sm text-gray-600';
                specialty.textContent = doctor.specialty;

                // Assembler la partie infos
                infoDiv.appendChild(title);
                infoDiv.appendChild(specialty);

                // --- Créer le bouton Sauvegarder ---
                const saveButton = document.createElement('button');
                saveButton.className = 'save-btn mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center justify-center';
                saveButton.dataset.id = doctor.id; // Utiliser .dataset pour les attributs data-*
                saveButton.innerHTML = '<i class="ri-save-line mr-2"></i>Sauvegarder'; // OK d'utiliser innerHTML pour l'icône

                // Assembler la rangée du haut
                topRowDiv.appendChild(infoDiv);
                topRowDiv.appendChild(saveButton);

                // --- Créer la rangée du bas (checkboxes) ---
                const checkboxesDiv = document.createElement('div');
                checkboxesDiv.className = 'mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4';

                // Boucler pour créer chaque checkbox
                daysOfWeek.forEach(day => {
                    const label = document.createElement('label');
                    label.className = 'flex items-center space-x-2 cursor-pointer';

                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.className = 'form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500';
                    input.value = day;
                    if (savedAvail.includes(day)) {
                        input.checked = true;
                    }

                    const span = document.createElement('span');
                    span.className = 'text-gray-700 select-none';
                    span.textContent = day;

                    // Assembler la checkbox
                    label.appendChild(input);
                    label.appendChild(span);
                    checkboxesDiv.appendChild(label);
                });

                // --- Assembler la carte finale ---
                doctorDiv.appendChild(topRowDiv);
                doctorDiv.appendChild(checkboxesDiv);
                
                // Ajouter la carte complète à la liste
                cardsList.appendChild(doctorDiv);
            });
            // -----------------------------------------------------------------
            // FIN DE LA SECTION MODIFIÉE
            // -----------------------------------------------------------------

            // 4. GÉRER LES CLICS SUR "SAUVEGARDER" (US6)
            cardsList.addEventListener('click', (e) => {
                const saveButton = e.target.closest('.save-btn');
                if (!saveButton) return;

                const doctorId = saveButton.dataset.id;
                const card = saveButton.closest('.bg-gray-50');
                
                const selectedDays = [];
                card.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                    selectedDays.push(checkbox.value);
                });

                localStorage.setItem(`availability_${doctorId}`, JSON.stringify(selectedDays));
                showConfirmation('Disponibilités mises à jour');
            });
            
        }) // Fin du .then(jsonData => { ... })
        .catch(error => {
            console.error("Erreur lors du chargement des données médecins:", error);
            const container = document.getElementById('medecinCards');
            if (container) {
                container.innerHTML = '<p class="p-6 text-red-500 font-bold">Impossible de charger les données des médecins. Vérifiez la console.</p>';
            }
        });

    // 5. Injecter les styles pour le message de confirmation (toast)
    addToastStyles();
});

/**
 * Affiche un message de confirmation (toast)
 */
function showConfirmation(message) {
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500);
    }, 3000);
}

/**
 * Injecte le CSS nécessaire pour le toast dans le <head>
 */
function addToastStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .toast-message {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.5s ease;
            background-color: #2563eb; /* bg-blue-600 */
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .toast-message.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}