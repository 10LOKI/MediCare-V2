document.addEventListener("DOMContentLoaded", () => {
  fetch('scripts/Doctors-v2.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur réseau lors de la récupération du JSON");
      }
      return response.json();
    })
    .then(data => {
      const doctors = data.doctors;
      const totalMedecins = doctors.length;

      const medecinsDisponibles = doctors.filter(doc => doc.jours > 0).length;
      const totalRendezVous = "N/A"; 
      const allSpecialties = doctors.map(doc => doc.specialty);
      const uniqueSpecialties = new Set(allSpecialties);
      const nombreSpecialites = uniqueSpecialties.size;

      const elementTotal = document.getElementById('stat-total-medecins');
      if (elementTotal) {
        elementTotal.textContent = totalMedecins;
      }
      
      const elementDisponibles = document.getElementById('stat-medecins-disponibles');
      if (elementDisponibles) {
        elementDisponibles.textContent = medecinsDisponibles;
      }

      const elementRdv = document.getElementById('stat-total-rendez-vous');
      if (elementRdv) {
        elementRdv.textContent = totalRendezVous;
      }
      
      const elementSpecialites = document.getElementById('stat-nombre-specialites');
      if (elementSpecialites) {
        elementSpecialites.textContent = nombreSpecialites;
      }
      
    })
    .catch(error => {
      console.error("Impossible de charger les données des médecins:", error);
      
      document.getElementById('stat-total-medecins').textContent = "Erreur";
      document.getElementById('stat-medecins-disponibles').textContent = "Erreur";
      document.getElementById('stat-total-rendez-vous').textContent = "Erreur";
      document.getElementById('stat-nombre-specialites').textContent = "Erreur";
    });
});

function updateTime() {
    const clockElement = document.getElementById("montre");
    
    const now = new Date();
    
    const dateString = now.toLocaleDateString();
    
    const timeString = now.toLocaleTimeString();
    clockElement.textContent = dateString + " - " + timeString;
}

window.onload = function() {
    updateTime(); 
    setInterval(updateTime, 1000);
};