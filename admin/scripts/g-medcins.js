/////////////////////=> njibo data mn json wen hatoha f localeStorage <=\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
fetch("../scripts/Doctors-v2.json")
    .then(function (reponse) {
        return reponse.json();
    })
    .then(function (data) {
        let storedDoctor = localStorage.getItem("doctors");

        if (storedDoctor === null) {
            localStorage.setItem("doctors", JSON.stringify(data.doctors));
        }
        else {
            console.log("deja localStorage 3amer")
        }

        let storedSpecialties = localStorage.getItem("specialties");
        if (storedSpecialties === null) {
            localStorage.setItem("specialties", JSON.stringify(data.specialties));
            
        } else {
            console.log("localStorage specialties déjà rempli");
        }

        fillSpecSelect();
        displayData();

    })
////////////////////////////=> nlinkiw m3a specialities <=\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function fillSpecSelect() {
    const specSelect = document.getElementById("specInpute");
    let specialities = JSON.parse(localStorage.getItem("specialties"));
    console.log("hadi hia", specialities);


    if (specialities.length <= 0) {
        console.warn(" Aucun spécialité trouvé dans localStorage !");
    }
    else {
        for (let i = 0; i < specialities.length; i++) {
            let specOption = document.createElement("option");
            specOption.value = specialities[i];
            specOption.textContent = specialities[i];
            specSelect.appendChild(specOption);
        }
    }
}

///////////////////////////////////=> daba khasna n affichiw data <=\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function displayData() {
    let medicinsTbody = document.getElementById("medecinsTbody");
    let doctors = JSON.parse(localStorage.getItem("doctors"));

    medicinsTbody.innerHTML = "";
    for (let i = 0; i < doctors.length; i++) {

        const tr = document.createElement("tr");

        const imageTd = document.createElement("td");
        const img = document.createElement("img");
        img.src = doctors[i].image;
        img.alt = doctors[i].name;
        img.className = "w-16 h-16 object-cover rounded-full mx-auto";
        imageTd.className = "border border-gray-300 p-2";
        imageTd.appendChild(img);
        tr.appendChild(imageTd);

        const nameTd = document.createElement("td");
        nameTd.textContent = doctors[i].name;
        nameTd.className = "border border-gray-300 p-2 text-center"
        tr.appendChild(nameTd);

        const specTd = document.createElement("td");
        specTd.textContent = doctors[i].specialty;
        specTd.className = "border border-gray-300 p-2 text-center"
        tr.appendChild(specTd);

        const tdButton = document.createElement("td");
        tdButton.className = "border border-gray-300 p-2 text-center";

        const editButton = document.createElement("button");
        editButton.textContent = "Modifier"
        editButton.className =
            "text-green-700 hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";
        tdButton.appendChild(editButton);
        //=> l'appel de function modifier
        editButton.addEventListener("click", function () {
            modifierButtonFunction(doctors[i]);
        })
        const supButton = document.createElement("button");
        supButton.textContent = "Supprimer";
        supButton.className =
            "text-red-700 hover:text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";
        tdButton.appendChild(supButton);
        //=> l'appel de function Supprimer
        supButton.addEventListener("click", function () {
            supprimerButtonFunction(doctors[i]);
        })
        tr.appendChild(tdButton);
        medicinsTbody.appendChild(tr);

        console.log("hna kol tbib bouhdo affichage dyalo", doctors[i])
    }
    
}
//////////////////////////=>nkhadmo 3la l button dyal ajouter un medecin <=\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const ajouterModel = document.getElementById("ajouterModel");
const ajouterDoc = document.getElementById("ajouterDoc");
const annulerButtonForm = document.getElementById("annulerButtonMedecin");
const ajouterButtonForm = document.getElementById("ajouterFormButton");
///////==> input variable
let nameInput = document.getElementById("nameInpute");
let specInput = document.getElementById("specInpute");
let photoInput = document.getElementById("inputPhoto");
let descInput = document.getElementById("discriptionInput");
let hiddenID = document.getElementById("doctorId");
///////===> dashboard Ajouter Button
ajouterDoc.addEventListener("click", function () {
    hiddenID.value = "";
    nameInput.value = "";
    specInput.value = "";
    photoInput.value = "";
    descInput.value = "";
    ajouterModel.classList.remove("hidden");
})
//////// ====> annuler Button 
annulerButtonForm.addEventListener("click", function () {
    ajouterModel.classList.add("hidden");
})

ajouterButtonForm.addEventListener("click", function () {
    ///=> nakhdo l value dyal input 
    let nameInputValue = nameInput.value.trim();
    let specInputValue = specInput.value.trim();
    let photoInputValue = photoInput.value.trim();
    let descInputValue = descInput.value.trim();

    //=>njibo data mn localeStorage
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    //=> check wach ra7na fel modification
    if (hiddenID.value) {
        const docId = parseInt(hiddenID.value);
        const doctor = doctors.find((dr) => dr.id === docId);

        if (doctor) {
            doctor.name = nameInputValue;
            doctor.specialty = specInputValue;
            doctor.image = photoInputValue;
            doctor.description = descInputValue;
        }
        localStorage.setItem("doctors", JSON.stringify(doctors));
        displayData();
        console.log(doctors);

        hiddenID.value = "";
        nameInput.value = "";
        specInput.value = "";
        photoInput.value = "";
        descInput.value = "";

        ajouterButtonForm.textContent = "Ajouter"

        ajouterModel.classList.add("hidden");
        return;
    }
    //=> name et spec required
    if (!nameInputValue || !specInputValue) {
        alert("Veuillez remplir au moins le nom et la spécialité !");
        return;
    }
    //=> khasna newId ne3tiweh l newDoc
    let newId = doctors.length > 0 ? doctors[doctors.length - 1].id + 1 : 1;

    //=> ncriyiw object jdid l newDoc
    let newDoc = {
        id: newId,
        name: nameInputValue,
        specialty: specInputValue,
        image: photoInputValue,
        description: descInputValue
    }
    //=>pushi newDoc l doctors lihia data dyalna 
    doctors.push(newDoc);

    //=> nsifto doctors l localeStorage
    localStorage.setItem("doctors", JSON.stringify(doctors));
    displayData();

    //=> khwi l input
    nameInput.value = "";
    specInput.value = "";
    photoInput.value = "";
    descInput.value = "";
    //=> sad lforme
    ajouterModel.classList.add("hidden");

    console.log(doctors)
})
/////////////////////// daba MODIFIER function 
function modifierButtonFunction(doc) {
    ajouterModel.classList.remove("hidden");
    document.getElementById("nameInpute").value = doc.name;
    document.getElementById("specInpute").value = doc.specialty;
    document.getElementById("inputPhoto").value = doc.image;
    document.getElementById("discriptionInput").value = doc.description;

    document.getElementById("doctorId").value = doc.id;

    document.getElementById("ajouterFormButton").textContent = "Modifier";
}
///////////////////////////// daba khdam 3la SUPPRIMER
function supprimerButtonFunction(doc) {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    console.log("ttttt", doctors);
    let index = doctors.findIndex(dr => dr.id === doc.id);

    if (index !== -1) {
        doctors.splice(index, 1);
        localStorage.setItem("doctors", JSON.stringify(doctors)) || [];
        displayData();
    }
}

///// bach nsado l forme b click berra
ajouterModel.addEventListener("click", function (e) {
    if (e.target === ajouterModel) {
        ajouterModel.classList.add("hidden");
    }
<<<<<<< HEAD:v2Medicare/scripts/g-medcins.js
})

=======
})
>>>>>>> f35710eaa0b3ae49c24d529966e33b4f3e9dfcb9:admin/scripts/g-medcins.js
