document.addEventListener("DOMContentLoaded", () => {
  fetch('scripts/Doctors-v2.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur réseau lors de la récupération du JSON");
      }
      return response.json();
    })
    .then(data => {
      // 'data' contient maintenant tout ton objet JSON
      const doctors = data.doctors;

      // ---------------------------------------------------
      // CALCUL DES STATISTIQUES
      // ---------------------------------------------------

      // Critère 1: Nombre total de médecins
      const totalMedecins = doctors.length;

      // Critère 2: Nombre de médecins disponibles
      // On filtre la liste pour ne garder que ceux avec "availability": "available"
      const medecinsDisponibles = doctors.filter(doc => doc.availability === 'available').length;

      // Critère 3: Total de rendez-vous
      // !! Cette donnée n'est pas dans Doctors-v2.json.
      // Nous laissons "N/A" (Non disponible)
      const totalRendezVous = "N/A"; 

      // Critère 4: Nombre de spécialités
      // 1. On crée une liste de toutes les spécialités (avec doublons)
      const allSpecialties = doctors.map(doc => doc.specialty);
      // 2. On utilise un Set pour ne garder que les valeurs uniques
      const uniqueSpecialties = new Set(allSpecialties);
      // 3. On compte le nombre d'éléments uniques
      const nombreSpecialites = uniqueSpecialties.size;

      // ---------------------------------------------------
      // MISE À JOUR DU HTML
      // ---------------------------------------------------
      
      // Mettre à jour le total des médecins
      const elementTotal = document.getElementById('stat-total-medecins');
      if (elementTotal) {
        elementTotal.textContent = totalMedecins;
      }
      
      // Mettre à jour les médecins disponibles
      const elementDisponibles = document.getElementById('stat-medecins-disponibles');
      if (elementDisponibles) {
        elementDisponibles.textContent = medecinsDisponibles;
      }

      // Mettre à jour le total des rendez-vous
      const elementRdv = document.getElementById('stat-total-rendez-vous');
      if (elementRdv) {
        elementRdv.textContent = totalRendezVous;
      }
      
      // Mettre à jour le nombre de spécialités
      const elementSpecialites = document.getElementById('stat-nombre-specialites');
      if (elementSpecialites) {
        elementSpecialites.textContent = nombreSpecialites;
      }
      
    })
    .catch(error => {
      // Gérer les erreurs (fichier non trouvé, JSON mal formé, etc.)
      console.error("Impossible de charger les données des médecins:", error);
      
      // Optionnel : afficher "Erreur" dans toutes les statistiques
      document.getElementById('stat-total-medecins').textContent = "Erreur";
      document.getElementById('stat-medecins-disponibles').textContent = "Erreur";
      document.getElementById('stat-total-rendez-vous').textContent = "Erreur";
      document.getElementById('stat-nombre-specialites').textContent = "Erreur";
    });
});


//la fonction de la date et heure
function updateTime() {
    // Get the <p> element with the id "clock"
    const clockElement = document.getElementById("montre");
    
    // Get the current date and time
    const now = new Date();
    
    // 1. Format the date (e.g., "07/11/2025")
    const dateString = now.toLocaleDateString();
    
    // 2. Format the time (e.g., "16:10:30")
    const timeString = now.toLocaleTimeString();
    
    // 3. Combine them and set the text
    clockElement.textContent = dateString + " - " + timeString;
}

// This function runs once the page is loaded
window.onload = function() {
    // Call the updateTime function right away to show the time immediately
    updateTime(); 
    // Then, keep updating it every second
    setInterval(updateTime, 1000);
};