const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]; // S77e7t "Samedu"

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
            const select = document.getElementById('doctor-filter-select'); 

            if (!container || !select) {
                console.error("Erreur : Ma kaynch l-container 'medcinCartes' wla 'doctor-filter-select'");
                return;
            }

            // === 1. 3emmro l-dropdown b les médecins ===
            select.innerHTML = '<option value="">-- Khtar Medcin --</option>';
            jsonData.doctors.forEach(medcin => {
                const option = document.createElement('option');
                option.value = medcin.id;
                option.textContent = `${medcin.name} (${medcin.specialty})`;
                select.appendChild(option);
            });

            // === 2. Tssennaw l-user ykhtar f l-dropdown ===
            select.addEventListener('change', () => {
                const medcinId = select.value;
                container.innerHTML = ''; 

                if (!medcinId) {
                    return;
                }

                const medcin = jsonData.doctors.find(doc => doc.id == medcinId);
                if (!medcin) return; 

                // === 3. N-creyiw l-card dial dak tbib ===
                
                const dispo = JSON.parse(localStorage.getItem(`dispo_${medcin.id}`)) || [];
                
                const medcinDiv = document.createElement('div');
                medcinDiv.className = 'bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200';

                const topDiv = document.createElement('div');
                topDiv.className = 'flex flex-col md:flex-row md:items-center md:justify-between';

                // === IḌAFA HNA (1): Wrapper bach njem3o tsswira + info ===
                const infoWrapper = document.createElement('div');
                infoWrapper.className = 'flex items-center';

                // === IḌAFA HNA (2): N-creyiw l-element <img> ===
                const img = document.createElement('img');
                img.className = 'h-12 w-12 rounded-full mr-4 object-cover';
                img.src = medcin.image; // Path mn JSON
                img.alt = medcin.name;
                infoWrapper.appendChild(img); // Ndkhloh f l-wrapper

                const infoDiv = document.createElement('div');
                const nom = document.createElement('h3');
                nom.className = 'text-lg font-semibold text-gray-900';
                nom.textContent = medcin.name;
                const specialite = document.createElement('p');
                specialite.className = 'text-sm text-gray-600';
                specialite.textContent = medcin.specialty;

                infoDiv.appendChild(nom);
                infoDiv.appendChild(specialite);

                // === IḌAFA HNA (3): Ndkhlo l-info 7da tsswira ===
                infoWrapper.appendChild(infoDiv);

                const sauvegardBtn = document.createElement('button');
                sauvegardBtn.className = 'save-btn mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center justify-center';
                sauvegardBtn.dataset.id = medcin.id;
                sauvegardBtn.innerHTML = '<i class="ri-save-line mr-2"></i>Sauvegarder';

                // === TBEDDIL HNA (4): Nzid l-wrapper (tsswira+info) f topDiv ===
                topDiv.appendChild(infoWrapper); 
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
                
   _            container.appendChild(medcinDiv); 
            });


            // === 4. L-Listener dial l-Sauvegarde (b event delegation) ===
            container.addEventListener('click', (e) => {
                const sauvegardBtn = e.target.closest('.save-btn');
                if (!sauvegardBtn) return;

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
            if (container) {
                container.innerHTML = '<p class="p-6 text-red-500 font-bold">Impossible de charger les données des médecins. Vérifiez la console.</p>';
            }
            const select = document.getElementById('doctor-filter-select');
            if(select) {
                select.innerHTML = '<option value="">-- Erreur f chargement --</option>';
 x            select.disabled = true;
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
D           color: white;
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