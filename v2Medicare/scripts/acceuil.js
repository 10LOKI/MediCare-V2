document.addEventListener("DOMContentLoaded", () => {
  fetch('scripts/Doctors-v2.json')
    .then(response => {
        if(!response.ok )
        {
            throw new Error ("on a pas recu le json");
        }
        return response.json();
    })
.then(data => {
    const doctors = data.doctors;
    const totalMedcins = doctors.length;

    const medcinsDisponibles = doctors.filter(doc => doc.availability === 'available').length;

    const totalRendezVous = "N/A";

    const allSpecialities = doctors.map(doc => doc.specialty);
    const uniqueSpecialities = new Set(allSpecialities);
    const nombreSpecialities = uniqueSpecialities.size;

    const elementTotal = document.getElementById('stat-total-medecins');
    if(elementTotal)
    {
        elementTotal.textContent = totalMedcins;
    }
    const elementDisponibles = document.getElementById('stat-medecins-disponibles');
    if(elementDisponibles)
    {
        elementDisponibles.textContent = medecinsDisponibles;
    }
    const elementRdv = document.getElementById('stat-total-rendez-vous');
    if(elementRdv)
    {
        elementRdv.textContent = totalRendezVous;
    }
    const elementSpecialites = document.getElementById('stat-nombre-specialites');
    if( elementSpecialites)
    {
        elementSpecialites.textContent = nombreSpecialities;
    }

})
.catch(error => {
    console.error("Impossible de charger les donnees des medcins",error);
});

function updateTime() {
    const clockElement = document.getElementById("montre");
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    if (clockElement)
    {
        clockElement.textContent = dateString + " - " + timeString;
    }
    
}
window.onload = function() {
    updateTime(); 
    setInterval(updateTime, 1000);
}
});
