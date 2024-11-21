export async function searchfieldFunc() {
    console.log('test');
    var preloadbg = document.createElement("img");
    preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";
    
    document.getElementById("searchfield").addEventListener("focus", function () {
        if (this.value == "Search contacts...") {
            this.value = "";
        }
    });
    
    document.getElementById("searchfield").addEventListener("focusout", function () {
        if (this.value == "") {
            this.value = "Search contacts...";
        }
    });
    
    document.getElementById("sendmessage").querySelector("input").addEventListener("keydown", function(e) {
        if (e.key === 'Enter' && this.value.trim() !== "") {
            sendMessage(this.value.trim());
            this.value = ''; // Clear input field after sending
        }
    });
    
    
    document.getElementById("sendmessage").querySelector("input").addEventListener("focusout", function () {
        if (this.value == "") {
            this.value = "Send message...";
        }
    });
}
//});

export var destinataire;
export var windowWidth;

export async function friendsChat(func) {
    document.querySelectorAll(".friend").forEach(function (friend) {
        friend.addEventListener("click", function (e) {
            console.log("amy", friend.id);
            e.preventDefault();
            destinataire = friend.id;
            func(friend, destinataire);
            fetchDataChat(destinataire, '0', 'true');
            console.log('hello', destinataire);
            var childOffset = friend.getBoundingClientRect();
            var parentOffset = friend.parentElement.parentElement.getBoundingClientRect();
            var childTop = childOffset.top - parentOffset.top;
            var clone = friend.querySelector("img").cloneNode(true);
            //var clone = friend.querySelector("img");
            var top = childTop + 12 + "px";

            clone.style.top = top;
            clone.classList.add("floatingImg");

            setTimeout(function () {
                document.getElementById("profile").querySelector("p").classList.add("animate");
                document.getElementById("profile").classList.add("animate");
            }, 100);

            setTimeout(function () {
                document.getElementById("chat-messages").classList.add("animate");
                document.querySelectorAll('.cx, .cy').forEach(function (el) {
                    el.classList.add('s1');
                });
                setTimeout(function () {
                    document.querySelectorAll('.cx, .cy').forEach(function (el) {
                        el.classList.add('s2');
                    });
                }, 100);
                setTimeout(function () {
                    document.querySelectorAll('.cx, .cy').forEach(function (el) {
                        el.classList.add('s3');
                    });
                }, 200);
            }, 150);

            animateElement(clone, {
                width: 68,
                left: 140,
                top: 20
            }, 200, false);

            document.getElementById("chatbox").appendChild(clone);

            var name = friend.querySelector("p strong").innerHTML;
            var email = friend.querySelector("p span").innerHTML;
            document.getElementById("profile").querySelector("p").innerHTML = name;
            document.getElementById("profile").querySelector("span").innerHTML = email;

            document.querySelectorAll(".message:not(.right) img").forEach(function (img) {
                img.src = clone.src;
            });

            document.getElementById("friendslist").style.display = "none";
            document.getElementById("chatview").style.display = "block";

            //document.getElementById("close").removeEventListener("click", (e)=>{
            //    e.preventDefault();
            //});

            readMsg(friend)
            document.getElementById("close").addEventListener("click", function () {
                document.getElementById("chat-messages").classList.remove("animate");
                document.getElementById("profile").classList.remove("animate");
                document.querySelectorAll('.cx, .cy').forEach(function (el) {
                    el.classList.remove("s1", "s2", "s3");
                });
                readMsg(friend)
                animateElement(clone, {
                    width: 40,
                    left: 12,
                    top: top
                }, 200, true);

                setTimeout(function () {
                    document.getElementById("chatview").style.display = "none";
                    document.getElementById("friendslist").style.display = "flex";
                }, 50);
            });
            //document.getElementById('chat-messages').addEventListener('scroll', throttledScroll);
        });
    });
    handleResize();
    // Ajoutez un gestionnaire de défilement pour charger plus de messages lorsqu'on atteint le haut du chat
    document.getElementById('chat-messages').addEventListener('scroll', throttledScroll);
}

function readMsg(friend) {
    var notificationIcon = friend.querySelector('.notification-icon')
   
    if (notificationIcon) {
        notificationIcon.remove();
        var dest = parseInt( destinataire) ; // Remplacez par l'ID réel de l'utilisateur destinataire
        console.log("dest",dest)
        var exp= parseInt (document.getElementById("userID").textContent)
        console.log("exp",exp)
        // Créez un objet JavaScript avec les données à envoyer
        var requestData = {
            userId: exp,
            senderId: dest
        };

    
        fetch(`/close-chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update messages status');
                }
                return response.json();
            })
            .then(data => {
                // Gérer la réponse du serveur si nécessaire
            })
            .catch(error => {
                console.error('Error updating messages status:', error);
            });
    }
}

function animateElement(element, properties, duration, shouldRemove) {
    const start = {};
    const changes = {};
    const startTime = performance.now();

    // Stocke les valeurs de départ
    for (const prop in properties) {
        start[prop] = parseFloat(element.style[prop]) || 0;
        changes[prop] = properties[prop] - start[prop];
    }
    function update() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(1, elapsed / duration);

        // Applique les changements progressifs
        for (const prop in changes) {
            element.style[prop] = start[prop] + changes[prop] * progress + 'px';
        }

        // Continue l'animation si la durée n'est pas écoulée
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Fin de l'animation
            if (shouldRemove) {
                // Supprime l'élément du DOM
                console.log('element.parentNode ', element);
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }
        }
    }

    // Démarre l'animation
    requestAnimationFrame(update);
}

export function chatElement(data) {
    var UserId = document.getElementById('userID').textContent
    var div = document.createElement('div');

    // Ajoutez une classe différente en fonction de l'expéditeur
    if (data.Expediteur == UserId) {
        div.classList.add('message', 'right', 'sender'); // Classe 'sender' pour les messages du sender
    } else {
        div.classList.add('message', 'receiver'); // Classe 'receiver' pour les messages du receiver
    }

    console.log("aD;LK", data.Date)
    div.innerHTML = `
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/${data.Expediteur}_copy.jpg" />
        <div class="bubble">
            ${data.Contenu}
            <div class="corner"></div>
            <span>${data.Date}</span>
        </div>
    `;

    return div;
}


function fetchDataChat(destinataire, index, firstLoad) {

    fetch('/recupChat', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destinataire: destinataire, firstLoad: firstLoad, index: index }),
    })
        .then(response => response.json())
        .then(data => {
            loadChat(data, firstLoad);
            var scrollToBottom = false;
            if (firstLoad === true) {
                scrollToBottom = true;
            }

            if (scrollToBottom) {
                content.scrollTop = content.scrollHeight;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête fetch sur chat:', error);
        });
}

function loadChat(data, firstLoad) {
    var content = document.getElementById('chat-messages');
    var scrollToBottom = false;

    if (firstLoad === 'true') {
        content.innerHTML = '';
        scrollToBottom = true; // Set to true after adding a new message
    }

    const keys = Object.keys(data);
    for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        const label = document.createElement('label');
        label.textContent = key;

        if (Object.hasOwnProperty.call(data, key)) {
            const messages = data[key];
            for (let index = 0; index < messages.length; index++) {
                content.insertBefore(chatElement(messages[index]), content.firstElementChild);
            }
            content.insertBefore(label, content.firstElementChild);
        }
    }


    if (scrollToBottom) {
        content.scrollTop = content.scrollHeight;
    }

}

function throttle(func, wait) {
    let timeout;

    return function () {
        const context = this;
        const args = arguments;

        if (!timeout) {
            timeout = setTimeout(function () {
                func.apply(context, args);
                timeout = null;
            }, wait);
        }
    };
}

function checkScroll() {
    const content = document.getElementById('chat-messages');

    if (content.scrollTop === 0) {
        // Si au sommet, charger plus de messages
        loadMoreMessages();
    }
}

const throttledScroll = throttle(checkScroll, 200);

// Ajouter le gestionnaire de défilement à l'élément content

function displayChatContent() {
    if (document.getElementById('chatbtn')) {
        document.getElementById('chatbtn').addEventListener('click', (e) => {
            var chatbox = document.getElementById('chatbox');
            var mainContainer = document.querySelector('.main-container')
            chatbox.style.top = '50px';
            mainContainer.style.marginTop = '45em';
            chatbox.style.display = 'block';
            console.log('success');
        })
    }
}

function resetChatContent(windowWidth) {
    var mainContainer = document.querySelector('.main-container')
    var chatbox = document.getElementById('chatbox');
    if (windowWidth > 768 && windowWidth <= 1024 && mainContainer && chatbox) {
        mainContainer.style.marginTop = '4em';
        chatbox.style.top = '90px';
    } else if (mainContainer && chatbox){
        mainContainer.style.marginTop = '90px';
        chatbox.style.top = '0px';
    }
    document.querySelector('.seachbar').style.display = 'flex';
    document.getElementById('chatbtn').style.display = 'none';
    console.log('Réinitialisation du contenu du chat...');
}

function handleResize() {
    // Récupérer la largeur de la fenêtre du navigateur
    windowWidth = window.innerWidth;
    //var ul = document.querySelector('.category-list')
    var btn = document.querySelector('.menu-button ')
    var main = document.querySelector('.main-container')
    // Vérifier la largeur et appeler la fonction appropriée
    if (windowWidth <= 768) {
        document.querySelector('.seachbar').style.display = 'none';
        document.getElementById('chatbtn').style.display = 'block';
        main.style.marginTop = '7em'
        if (btn) {
            btn.style.top = '40px'
        }
        displayChatContent();
    } else {
        resetChatContent(windowWidth);
    }
}

// Appeler la fonction handleResize lors du chargement initial de la page
// Ajouter un écouteur d'événements pour la redimension de la fenêtre
window.addEventListener('resize', handleResize);


function loadMoreMessages() {
    // Utilisez la variable destinataire ici
    var allMessages = document.querySelectorAll('.bubble');
    var index;
    if (allMessages) {
        index = allMessages.length - 1;
    }

    // Convertissez l'index en chaîne avant de l'ajouter au payload
    fetchDataChat(destinataire, (index + 1).toString(), 'false');
}
function sendMessage(messageContent) {
    const requestData = {
        destinataire: destinataire,
        content: messageContent,
        senderId: document.getElementById("userID").textContent
    };

    fetch('/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Handle message sent success
            console.log("Message sent successfully!");
            loadChat(data, 'false');  // Assuming this loads the new message into the chat
        } else {
            // Handle error
            console.error("Error sending message:", data.error);
        }
    })
    .catch(error => {
        console.error("Network error while sending message:", error);
    });
}
