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
        fillSpecSelect();
        displayData();
    })

    .then(jsonData =>
    {
        const container = document.getElementById('medcinCartes');
        
    }
    )
function dispoConnect()
{
    const choiDispo = document.getElementById
}