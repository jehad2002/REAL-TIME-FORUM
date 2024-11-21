import { handleCheckboxChange, FormatDate } from './formpost.js';
import { chatElement, destinataire } from './chat.js';
import { fetchCommentPost } from './app.js';
import { createCommentDiv } from './components/commentComponent.js';

var socket;
let notificationNumber = 0;
var nbrPost;
export var allElementPost
export const socketConnect = (func) => {
    //alert('in process to connect ...')
    socket = new WebSocket("ws://localhost:8080/ws");
    socket.onopen = function () {
        console.log('Status : You CONNECTED')
    };
    socket.onmessage = function (e) {
        var data = JSON.parse(e.data);
        handleMessage(data, func)
        nbrPost = document.querySelectorAll('.post').length
    };
}

const CREATE_POST_ACTION = 'createPost';
const CHAT_ACTION = 'chat';
const CREATE_COMMENT_ACTION = 'comment';

let metadata = {
    'Action': '',
    'UserId': 0,
    'Status': 'on',
    'UserName': '',
    'Name': '',
    'Date': '',
    'Title': '',
    'Categories': [],
    'Category': [],
    'Content': '',
    'ImagePath': '',
    'VideoPath': "",
    'IsLike': false,
    'Likes': '',
    'DisLikes': '',
    'IsDisLike': false,
    'PostId': 0,
    'Comments': "",
    'Expediteur': 0,
    'Destinataire': 0,
    'Contenu': '',
    'Image': '',
    'ParentId': 0,
    'UserId': 0,
    'Date': '',
    'Istyping': '',
};

export function getContentPost() {
    const buttonSubmitFormPrincial = document.getElementById('buttonSubmitFormPrincial');
    buttonSubmitFormPrincial.addEventListener('click', () => {
        const titlePost = document.querySelector('.titlePost input');
        const contentPost = document.querySelector('.contentPost textarea');
        const fileInput = document.querySelector('.UploadImVid input');
        const userID = Number(document.querySelector('#userID').textContent);

        // Vérifier la longueur du titre et du contenu du post
        if (titlePost.value.length > 100) {
            CheckInput('Le titre ne doit pas dépasser 100 caractères.');
            return; // Ne pas envoyer le post si la condition n'est pas satisfaite
        }
        if (titlePost.value.length < 3) {
            CheckInput('Le titre doit avoir au moins 5 caractères.');
            return; // Ne pas envoyer le post si la condition n'est pas satisfaite
        }

        if (contentPost.value.length > 1500) {
            CheckInput('Le contenu ne doit pas avoir plus de 15000 caractères.');
            return; // Ne pas envoyer le post si la condition n'est pas satisfaite
        }

        if (contentPost.value.length < 5) {
            CheckInput('Le contenu doit avoir au moins 5 caractères.');
            return; // Ne pas envoyer le post si la condition n'est pas satisfaite
        }

        // Vérifier si au moins une catégorie a été cochée
        const selectedCategories = handleCheckboxChange()[1];
        if (selectedCategories.length === 0) {
            CheckInput('Veuillez sélectionner au moins une catégorie.');
            return; // Ne pas envoyer le post si la condition n'est pas satisfaite
        }

        var idpost = document.querySelectorAll('post').length +1

        metadata = {
            ...metadata,
            'Action': CREATE_POST_ACTION,
            'UserId': userID,
            'UserName': getUsername(),
            'Name': getUsername(),
            'Date': FormatDate(new Date()),
            'Title': titlePost.value,
            'Categories': selectedCategories,
            'Category': handleCheckboxChange()[0],
            'Content': contentPost.value,
            'PostId': nbrPost+1,
        };

        if (titlePost.value && contentPost.value && selectedCategories.length !== 0) {
            socketSendPost(titlePost, contentPost, fileInput, metadata);
        }
    });
}



function socketSendComment(content, metadata) {
    socket.send(JSON.stringify(metadata));
    content.value = '';
}

export function getContentComment() {
    const formComment = document.getElementById('formPostcomment');
    formComment.addEventListener('submit', (event) => {
        event.preventDefault();

        const postIDElement = document.getElementById('postid');
        const parentIDElement = document.getElementById('parentid');
        const userIDElement = document.querySelector('#userID');
        const content = document.getElementById('contenu');

        if (!(postIDElement && parentIDElement && userIDElement && content)) {
            CheckInput('PLEASE DONT CHANGE MY ID');
        }
        const contentValue = content.value;

        // Vérifier la longueur du contenu du commentaire
        if (contentValue.length > 500) {
            CheckInput('Le commentaire ne doit pas dépasser 500 caractères.');
            return; // Ne pas envoyer le commentaire si la condition n'est pas satisfaite
        }

        if (contentValue.length < 2) {
            CheckInput('Le commentaire doit  dépasser 1 caractère.');
            return; // Ne pas envoyer le commentaire si la condition n'est pas satisfaite
        }

        const postID = document.getElementById('postid').value;
        const parentID = document.getElementById('parentid').value;
        //const userID = Number(document.getElementById('userid').value);
        const userID = Number(document.querySelector('#userID').textContent);
        const date = FormatDate(new Date());
        metadata = {
            ...metadata,
            'Action': CREATE_COMMENT_ACTION,
            'UserId': userID,
            'UserName': getUsername(),
            'Name': getUsername(),
            'Date': 'Now',
            'Title': '',
            'Categories': [],
            'Category': [],
            'Content': contentValue,
            'Expediteur': 0,
            'Destinataire': 0,
            'Contenu': contentValue,
            'Image': '',
            'PostId': Number(postID),
            'ParentId': Number(parentID),
        };

        socketSendComment(content, metadata);
    });
}


function getUsername() {
    return document.querySelector('.username').textContent;
}

function handleMessage(data, func) {
    if (data.action === "userStatusUpdate") {
        // Mettez à jour le statut de l'utilisateur dans l'interface utilisateur
        updateFriendStatus(data.userID, data.status);
    } else if (data.Action === CREATE_POST_ACTION) {
        const element = func(data);
        const formPost = document.getElementById('formPost');
        if (data.Title) {
            document.getElementById('postContains').insertBefore(element, formPost.nextSibling);
        }
        document.getElementById('openPostForm').parentNode.style.display = 'flex';
        formPost.style.display = 'none';
        var btn = element.querySelector('.comment')
        btn.addEventListener('click', ()=>{
            fetchCommentPost(Number(btn.id))
        })
    } else if (data.Action === CHAT_ACTION) {
        // var expediteur = document.getElementById(data.Expediteur);
        var destinataire = document.querySelector(".friend" + String(data.Destinataire))
        var expediteurNotify = document.querySelector(".friend" + String(data.Expediteur));
        var parent;
        if (expediteurNotify && data.Istyping !== 'true' && data.Contenu != '') {
            notificationNumber++
            var existingNotificationIcon = expediteurNotify.querySelector('.notification-icon');
            // Si l'icône de notification existe déjà, mettez à jour son contenu
            if (existingNotificationIcon) {
                var existingNotificationContent = existingNotificationIcon.innerHTML;
                // Ajouter 1 au contenu existant (assumant que le contenu existant est un nombre)
                var notificationNumber = parseInt(existingNotificationContent) + 1;
                // Mettre à jour le contenu de l'icône de notification
                existingNotificationIcon.innerHTML = `${notificationNumber} <i class="fas fa-envelope"></i>`;
            } else {
                notificationNumber = 1
                // Sinon, ajoutez une nouvelle icône de notification
                expediteurNotify.insertAdjacentHTML('beforeend', `<span  style="color:blue;"class="notification-icon">${notificationNumber} <i class="fas fa-envelope"></i></span>`);
            }
            parent = expediteurNotify.parentNode;
            parent.insertBefore(expediteurNotify, parent.firstChild);
        } else {
            if (data.Istyping == 'true') {
                createElementIsTyping(expediteurNotify)
            } else {
                if (expediteurNotify) {
                    document.querySelector('.istyping').style.display = 'none';
                }
            }
        }

        if (destinataire) {
            parent = destinataire.parentNode;
            parent.insertBefore(destinataire, parent.firstChild);
        }
        if (data.Istyping !== 'true' && data.Contenu != '') {
            const element = chatElement(data);
            const chatview = document.getElementById('chat-messages');
            chatview.appendChild(element);
        }
    } else if (data.Action === CREATE_COMMENT_ACTION) {
        const commentElement = createCommentDiv(data);
        const parent = document.querySelector('.list')
        if (parent) {
            parent.insertBefore(commentElement, parent.firstElementChild);
            //parent.appendChild(commentElement);
        }
    }
}

function socketSendPost(title, content, fileInput, metadata) {
    socket.send(JSON.stringify(metadata));
    title.value = '';
    content.value = '';
    fileInput.value = '';
}

export function getContentChat(friend, dest) {
    document.getElementById('send').addEventListener('click', (e) => {
        e.preventDefault();
        const content = document.querySelector('#sendmessage input');
        const loggedInUserId = getLoggedInUserId();
        metadata = {
            ...metadata,
            'Action': CHAT_ACTION,
            'UserId': loggedInUserId,
            'UserName': document.querySelector('.username').textContent,
            'Name': document.querySelector('.username').textContent,
            'Date': 'Now',
            'Title': '',
            'Categories': handleCheckboxChange()[1],
            'Category': handleCheckboxChange()[0],
            'Content': '',
            'Expediteur': loggedInUserId,
            'Destinataire': parseInt(destinataire),
            'Contenu': content.value,
            'Image': friend.querySelector('img').src,
            'Istyping': 'false',
        };

        if (content.value) {
            socketChatSend(content, metadata);
        }
    });
    IsTyping()
}

function getFriendId(friend) {
    return Number(friend.querySelector('p').lastElementChild.textContent);
}

function getLoggedInUserId() {
    return Number(document.getElementById('userID').textContent);
}

function socketChatSend(content, metadata) {
    socket.send(JSON.stringify(metadata));
    content.value = '';
    metadata.Contenu = '';
}


function CheckInput(mess) {
    // Vérifier si l'alerte existe déjà
    var existingAlert = document.querySelector('.custom-alert');

    // Si elle existe, la supprimer
    if (existingAlert) {
        existingAlert.remove();
    }

    var customAlert = document.createElement("div");
    customAlert.className = "custom-alert";
    customAlert.innerHTML = mess;

    // Ajoutez un bouton "Fermer" à l'alerte
    var closeButton = document.createElement("span");
    closeButton.innerHTML = "X"; // Texte pour le bouton de fermeture
    closeButton.className = "close-button";
    closeButton.addEventListener("click", function () {
        customAlert.style.display = "none"; // Cachez l'alerte lorsqu'on clique sur "Fermer"
    });
    customAlert.appendChild(closeButton);

    // Ajoutez l'alerte personnalisée à la page
    document.body.appendChild(customAlert);

    event.preventDefault(); // Empêche l'envoi du formulaire
}

function updateFriendStatus(userID, status) {
    const friendElement = document.querySelector(".friend" + userID);
    if (friendElement) {
        const statusElement = friendElement.querySelector('.status');
        if (statusElement) {
            statusElement.className = status === 'on' ? 'status' : 'status away';
        }
    }
}

function IsTyping() {
    metadata = {
        ...metadata,
        'Action': CHAT_ACTION,
        'UserId': getLoggedInUserId(),
        'UserName': document.querySelector('.username').textContent,
        'Name': document.querySelector('.username').textContent,
        'Date': 'Now',
        'Title': '',
        'Categories': handleCheckboxChange()[1],
        'Category': handleCheckboxChange()[0],
        'Content': '',
        'Expediteur': getLoggedInUserId(),
        'Destinataire': parseInt(destinataire),
        'Contenu': '',
        'Image': '',
        'Istyping': 'false', // Initialisez à 'false'
    };

    var input = document.querySelector('#sendmessage input');
    var typingTimeout;

    input.addEventListener('input', function (e) {
        clearTimeout(typingTimeout);

        if (metadata.Istyping === 'false') {
            metadata.Istyping = 'true';
            socket.send(JSON.stringify(metadata));
        }

        typingTimeout = setTimeout(function () {
            metadata.Istyping = 'false';
            socket.send(JSON.stringify(metadata));
        }, 900); 
    });

    input.addEventListener('blur', function (e) {
        clearTimeout(typingTimeout);

        if (metadata.Istyping === 'true') {
            metadata.Istyping = 'false';
            socket.send(JSON.stringify(metadata));
        }
    });
}


function createElementIsTyping(expediteur) {
    if (expediteur) {
        var username = expediteur.querySelector('.username').textContent;
        var span = document.querySelector('.istyping');
        span.style.display = 'flex';
        span.style.color = 'blue';
        span.style.position = 'absolute';
        span.style.zIndex = '12034';
        span.style.justifyContent = 'center';
        span.textContent = `${username} is typing ...`
    }
}


