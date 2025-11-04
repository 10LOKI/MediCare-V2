//================> Affichage de la liste de medecins <===============//
const tbody = document.getElementById("medecinsTbody");

fetch("../public/asset/Doctors.json")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        const doctors = data.doctors;
        console.log(doctors);
        doctors.forEach(function(doc){

            const tr = document.createElement("tr");

            // name td
            const tdName = document.createElement("td");
            tdName.textContent = doc.name;
            tr.appendChild(tdName);

            // speciality td
            const tdSpec = document.createElement("td");
            tdSpec.textContent = doc.specialty;
            tr.appendChild(tdSpec);

            // disponible td
            const tdDispo = document.createElement("td");
            tdDispo.textContent = doc.availabilityText; // بدل doc.dispo
            tr.appendChild(tdDispo);

            // buttons td
            const tdButton = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Modifier";
            tdButton.appendChild(editButton);

            const supButton = document.createElement("button");
            supButton.textContent = "Supprimer";
            tdButton.appendChild(supButton);

            tr.appendChild(tdButton);

            tbody.appendChild(tr);
        });
    })
    .catch(function(error){
        console.error("Erreur:", error);
    });

//================> Ajouter un medecin <===============//
const ajouteDoc = document.getElementById("ajouterDoc");

