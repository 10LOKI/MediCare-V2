const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]; // Samedi bla "u"

document.addEventListener('DOMContentLoaded', () => {
    fetch('../scripts/Doctors-v2.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur : ${response.status}`);
            }
            return response.json();
        })
        .then(jsonData => {
            const container = document.getElementById('medcinCartes');
            // Jbedna l-element <select> li zedna
            const select = document.getElementById('doctor-filter-select'); 

            if (!container || !select) {
                console.error("Erreur : Ma kaynch l-container 'medcinCartes' wla 'doctor-filter-select'");
                return;
            }

            // === 1. 3emmro l-dropdown b les médecins ===
            select.innerHTML = '<option value="">-- Khtar Medcin --</option>'; // Option par défaut
            jsonData.doctors.forEach(medcin => {
                const option = document.createElement('option');
                option.value = medcin.id; // L-value howa l-ID
                option.textContent = `${medcin.name} (${medcin.specialty})`; // L-text howa smia
                select.appendChild(option);
            });

            // === 2. Tssennaw l-user ykhtar f l-dropdown ===
            select.addEventListener('change', () => {
                const medcinId = select.value;
                container.innerHTML = ''; // Nkhwiw l-container kol mra

                // Ila khtar l-option l-khawya, man diro walo
                if (!medcinId) {
                    return;
                }

                // Nqelbo 3la l-medcin li khtar b l-ID dialo
                const medcin = jsonData.doctors.find(doc => doc.id == medcinId);
                if (!medcin) return; // Ma lqinahch

                // === 3. N-creyiw l-card dial dak tbib (Nefs l-code dialek) ===
                
                // Njbdo l-dispo dialo mn localStorage
                const dispo = JSON.parse(localStorage.getItem(`dispo_${medcin.id}`)) || [];
                
                const medcinDiv = document.createElement('div');
                medcinDiv.className = 'bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200';

                const topDiv = document.createElement('div');
                topDiv.className = 'flex flex-col md:flex-row md:items-center md:justify-between';

                const infoDiv = document.createElement('div');
                const nom = document.createElement('h3');
                nom.className = 'text-lg font-semibold text-gray-900';
                nom.textContent = medcin.name;
                const specialite = document.createElement('p');
                specialite.className = 'text-sm text-gray-600';
                specialite.textContent = medcin.specialty;

                infoDiv.appendChild(nom);
                infoDiv.appendChild(specialite);

                const sauvegardBtn = document.createElement('button');
                sauvegardBtn.className = 'save-btn mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center justify-center';
                sauvegardBtn.dataset.id = medcin.id; // N7etto l-ID hna
                sauvegardBtn.innerHTML = '<i class="ri-save-line mr-2"></i>Sauvegarder';

                topDiv.appendChild(infoDiv);
                topDiv.appendChild(sauvegardBtn);

                const checkboxDiv = document.createElement('div');
                checkboxDiv.className = 'mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4';

                jours.forEach(jour => {
                    const label = document.createElement('label');
                    label.className = 'flex items-center space-x-2 cursor-pointer';

                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.className = 'form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500';
                    input.value = jour;
                    if (dispo.includes(jour)) {
                        input.checked = true;
                    }
                    const span = document.createElement('span')
                    span.className = 'text-gray-700 select-none';
                    span.textContent = jour;

                    label.appendChild(input);
                    label.appendChild(span);
                    checkboxDiv.appendChild(label);
                });

                medcinDiv.appendChild(topDiv);
                medcinDiv.appendChild(checkboxDiv);
                
                // Nzidoha l-container bach tban
                container.appendChild(medcinDiv); 
            });


            // === 4. L-Listener dial l-Sauvegarde (b event delegation) ===
            // Ghadi n-applik-iwh 3la l-container kaml
            container.addEventListener('click', (e) => {
                const sauvegardBtn = e.target.closest('.save-btn');
                if (!sauvegardBtn) return; // Klikiti f blassa khra

                const medcinId = sauvegardBtn.dataset.id;
                const carte = sauvegardBtn.closest('.bg-gray-50');

                const choisJours = [];
                carte.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                    choisJours.push(checkbox.value);
                });
                localStorage.setItem(`dispo_${medcinId}`, JSON.stringify(choisJours));
                showConfirmation('Disponibilités mises a jour');
            })
        })
        .catch(error => {
            console.error("Erreur les cartes des medcins ne sont pas charges", error);
            const container = document.getElementById("medcinCartes");
            // Nbeddlo l-message dial l-erreur chwiya
            if (container) {
                container.innerHTML = '<p class="p-6 text-red-500 font-bold">Impossible de charger les données des médecins. Vérifiez la console.</p>';
            }
            const select = document.getElementById('doctor-filter-select');
            if(select) {
                select.innerHTML = '<option value="">-- Erreur f chargement --</option>';
                select.disabled = true;
            }
        })
    addToastStyles();
})

// === L-Functions dial l-Toast (bqa nefsso) ===
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