//================> Affichage de la liste de medecins <===============//
const tbody = document.getElementById("medecinsTbody");

fetch("../public/asset/Doctors.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const doctors = data.doctors;
        console.log(doctors);
        doctors.forEach(function (doc) {

            const tr = document.createElement("tr");

            // name td
            const tdName = document.createElement("td");
            tdName.textContent = doc.name;
            tdName.className = "border border-gray-300 p-2 text-center"
            tr.appendChild(tdName);

            // speciality td
            const tdSpec = document.createElement("td");
            tdSpec.textContent = doc.specialty;
            tdSpec.className = "border border-gray-300 p-2 text-center"
            tr.appendChild(tdSpec);

            // disponible td
            const tdDispo = document.createElement("td");
            tdDispo.textContent = doc.availabilityText; 
            tdDispo.className = "border border-gray-300 p-2 text-center"
            tr.appendChild(tdDispo);

            // buttons td
            const tdButton = document.createElement("td");
            tdButton.className = "border border-gray-300 p-2 text-center"

            const editButton = document.createElement("button");
            editButton.textContent = "Modifier";
            editButton.className = "text-green-700 hover:text-white  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            tdButton.appendChild(editButton);

            const supButton = document.createElement("button");
            supButton.textContent = "Supprimer";
            tdButton.appendChild(supButton);
            supButton.className = "text-red-700 hover:text-white  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            tr.appendChild(tdButton);

            tbody.appendChild(tr);
        });
    })
    .catch(function (error) {
        console.error("Erreur:", error);
    });

//================> Ajouter un medecin <===============//


