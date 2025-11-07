//================> Affichage de la liste de medecins <===============//



fetch("../scripts/Doctors-v2.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        let storedDoctors;
        storedDoctors = localStorage.getItem("doctors");

        if (storedDoctors === null) {
            localStorage.setItem("doctors", JSON.stringify(data.doctors));
            console.log("localestorage 3amernah");
        }
        else {
            console.log("localestorage fih data")

        }

        displayDoctors()
    })

function displayDoctors() {
    console.log("=== Appel de displayDoctors() ===");

    let tbody = document.getElementById("medecinsTbody");
    console.log("wach kayna", tbody)

    let doctors = JSON.parse(localStorage.getItem("doctors"));
    console.log("jabna data mn localstorage", doctors);

    tbody.innerHTML = "";
    console.log("tbody khawia",);

    for (let i = 0; i < doctors.length; i++) {
        let doc = doctors[i];
        console.log("hna traitement 3la kol medecin", i, doc);

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

    }
}

//==========================================> AJOUTER UN MEDECIN <=========================================//
//==>variables declaration<==//
const ajouterButtonMedecin = document.getElementById("ajouterDoc");
const ajouterFormMedecin = document.getElementById("ajouterModel");
const annulerButtonMedecin = document.getElementById("annulerButtonMedecin");
const ajouterFormButton = document.getElementById("ajouterFormButton");

//==>ajouter button pour afficher le forme d'ajoute<==//
ajouterButtonMedecin.addEventListener("click", () => ajouterFormMedecin.classList.remove("hidden"));

//==>annuler button pour masquer le forme d'ajoute<==//
annulerButtonMedecin.addEventListener("click", () => ajouterFormMedecin.classList.add("hidden"));

//==>ajoute buttone dans le forme pour transfere data ver localStorage<==//
ajouterFormButton.addEventListener("click", function () {

    //////////nous recuperons les donnes saisie par la secrutaire
    const nameInpute = document.getElementById("nameInpute");
    const specInpute = document.getElementById("specInpute");
    const inputPhoto = document.getElementById("inputPhoto");
    const discriptionInput = document.getElementById("discriptionInput");
    /////////nakhdo l value dyal input 
    const nameValue = nameInpute.value.trim();
    const specValue = specInpute.value.trim();
    const photoValue = inputPhoto.value.trim();
    const discriptionValue = discriptionInput.value.trim();
    ////////namevalue w specvalue is required
    if (!nameValue || !specValue) {
        alert("Veuillez remplir au moins le nom et la spécialité !");
        return;
    }

    ////////////// njibo data mn localeStorage
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    //////////////declaration variable newId pour le nouveau medecin dans la liste
    let newId = doctors.length > 0 ? doctors[doctors.length - 1].id + 1 : 1;
    ///////////// nsawbo l objets dyal new doctors
    const newDoctor = {
        id: newId,
        name: nameValue,
        specialty: specValue,
        photo: photoValue,
        description: discriptionValue,
        availabilityText: "Non Disponible" // valeur par défaut
    };
    //////////npuchi lel array dyal doctor
    doctors.push(newDoctor);
    /////nraj3o nsaviw data flocaleStorage m3a newDoctor
    localStorage.setItem("doctors", JSON.stringify(doctors));
    ///////n3awdo n affichiw localStorage
    displayDoctors();
    //////nkhwiw lform wen7aydo affichage dyalha
    nameInpute.value = "";
    specInpute.value = "";
    inputPhoto.value = "";
    discriptionInput.value = "";

    ajouterFormMedecin.classList.add("hidden");
    console.log(doctors.doctors);
})


