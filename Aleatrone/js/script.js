var timerId; // variable pour stocker l'identifiant du timer

function genererPhrase() {
  // Charger les fichiers JSON
  var xhr1 = new XMLHttpRequest();
  xhr1.open("GET", "json/sujet.json");
  xhr1.onload = function() {
    if (xhr1.status === 200) {
      var sujets = JSON.parse(xhr1.responseText);

      // Charger le fichier JSON des défis
      var xhr2 = new XMLHttpRequest();
      xhr2.open("GET", "json/defi.json");
      xhr2.onload = function() {
        if (xhr2.status === 200) {
          var defis = JSON.parse(xhr2.responseText);

          // Choisir une ligne aléatoire pour chaque fichier JSON
          var ligne1 = sujets[Math.floor(Math.random() * sujets.length)];
          var ligne2 = defis[Math.floor(Math.random() * defis.length)];

          // Générer une durée de temps aléatoire entre 1 seconde et 10 heures
          var duree = Math.round(Math.random() * 6599) + 1; // en secondes
          var secondes = duree

          if (duree >= 3600) {
            duree = Math.round(duree / 3600) + " heures";
          } else {
            duree = Math.round(duree / 60) + " minutes";
          }

          // Concaténer les lignes et la durée pour former une phrase
          var phrase = ligne1 + " " + ligne2 + " pendant " + duree;

          // Afficher la phrase dans le paragraphe "phrase"
          document.getElementById("phrase").innerHTML = phrase;

          // Afficher le timer
          var timerDiv = document.getElementById("timer");
          timerDiv.style.display = "block";

          // Arrêter le compte à rebours en cours s'il y en a un
          if (timerId) {
            clearInterval(timerId);
          }

          // Démarrer le compte à rebours
          timerId = setInterval(function() {
            // Décrémenter le nombre de secondes restantes
            secondes--;

            // Calculer les minutes et les secondes restantes
            var minutes = Math.floor(secondes / 60);
            var secondesRestantes = secondes % 60;

            // Afficher la durée dans le timer
            timerDiv.innerHTML = minutes + " : " + secondesRestantes ;

            // Si le temps est écoulé, afficher un message et arrêter le compte à rebours
            if (secondes <= 0) {
                clearInterval(timerId);
                timerDiv.innerHTML = "Temps écoulé !";
            }
          }, 1000);
        }
      };
      xhr2.send();
    }
  };
  xhr1.send();
}
