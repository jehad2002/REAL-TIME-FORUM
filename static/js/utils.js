

    function CheckInput(mess){
                var customAlert = document.createElement("div");
                customAlert.className = "custom-alert";
                customAlert.innerHTML = mess;
    
                // Ajoutez un bouton "Fermer" à l'alerte
                var closeButton = document.createElement("span");
                closeButton.innerHTML = "X"; // Texte pour le bouton de fermeture
                closeButton.className = "close-button";
                closeButton.addEventListener("click", function() {
                    customAlert.style.display = "none"; // Cachez l'alerte lorsqu'on clique sur "Fermer"
                });
                customAlert.appendChild(closeButton);
    
                // Ajoutez l'alerte personnalisée à la page
                document.body.appendChild(customAlert);
    
                event.preventDefault(); // Empêche l'envoi du formulaire
    }


    