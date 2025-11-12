document.addEventListener("DOMContentLoaded", () => {
    const storedDoctors = localStorage.getItem("doctors");
    const doctors = storedDoctors ? JSON.parse(storedDoctors) : [];
    
    const storedSpecialties = localStorage.getItem("specialties");
    const specialties = storedSpecialties ? JSON.parse(storedSpecialties) : [];

    const totalMedecins = doctors.length;
    const elementTotal = document.getElementById('stat-total-medecins');
    if (elementTotal) {
        elementTotal.textContent = totalMedecins;
    }

    let medecinsDisponiblesCount = 0;
    
    for (let i = 0; i < doctors.length; i++) {
        const doctor = doctors[i];
        const availabilityKey = `availability_${doctor.id}`;
        
        const doctorAvailabilityData = localStorage.getItem(availabilityKey);
        
        if (doctorAvailabilityData) {
            const availabilityArray = JSON.parse(doctorAvailabilityData);
            
            if (availabilityArray.length > 0) {
                medecinsDisponiblesCount++;
            }
        }
    }
    
    const elementDisponibles = document.getElementById('stat-medecins-disponibles');
    if (elementDisponibles) {
        elementDisponibles.textContent = medecinsDisponiblesCount;
    }

    const totalRendezVous = "N/A";
    const elementRdv = document.getElementById('stat-total-rendez-vous');
    if (elementRdv) {
        elementRdv.textContent = totalRendezVous;
    }

    const nombreSpecialites = specialties.length; 
    
    const elementSpecialites = document.getElementById('stat-nombre-specialites');
    if (elementSpecialites) {
        elementSpecialites.textContent = nombreSpecialites;
    }
});

function updateTime() {
    const clockElement = document.getElementById("montre");
    const now = new Date();
 
    const options = { weekday: 'long' };
    
    const dayString = now.toLocaleDateString('fr-FR', options);
    
    clockElement.textContent = dayString;
}

window.onload = function() {
    updateTime();
};