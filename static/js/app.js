import { createPostElement, createPostButton, formPost } from './components/postComponent.js';
import { createCategoryElement, createButtonCategoryElement } from './components/categoriesComponent.js';
import { createFooterElement } from './components/chatComponent.js';
import { createHeaderElement } from './components/headerComponent.js';
import { createLoginElement } from './components/loginComponent.js';  // Assurez-vous d'importer la fonction de création du formulaire de login
import { createRegisterElement } from './components/registerComponent.js';  // Assurez-vous d'importer la fonction de création du formulaire de login
import { createErrorPage } from './components/errorComponent.js';  // Assurez-vous d'importer la fonction de création du formulaire de login
import { checkToUploadText } from './formpost.js';
import { displayMenuButton } from './index.js';
import { filterByCategories } from './filterCategories.js';
import { getContentPost, getContentComment, socketConnect, getContentChat, allElementPost } from './socket.js';
import { searchfieldFunc, friendsChat, windowWidth } from './chat.js';
import { createComment } from './components/commentComponent.js';  // Assurez-vous d'importer la fonction de création du formulaire de login
var commentData = null;
var connectedUserName;
var connectedUserId;
var body = document.querySelector('body')

document.addEventListener("DOMContentLoaded", function () {
    // Vérifiez si l'URL est différente de http://localhost:8080/
    if (window.location.href == "http://localhost:8080/") {
        // Chargez la page de login au chargement de la page
        checkSessionOnLoad();
    } else if (window.location.href !== "http://localhost:8080/comment") {
        fetch("/check_session")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                socketConnect(createPostElement);
                const url = new URL(window.location.href);
                const postId = Number(url.searchParams.get("postId"));
                // Chargez les publications et les catégories
                fetchCommentPost(postId, data);
            } else {
            // Si la session n'est pas valide, chargez la page de connexion
            console.log('login page');
                loadLoginPage();
            }
        })
        .catch(error => {
            console.error("Erreur lors de la vérification de la session:", error);
            // En cas d'erreur, chargez la page de connexion par défaut
        });
    } else {
        // Chargez la page d'erreur 404
        loadErrorPage();
    }
});

function loadErrorPage() {

    fetch("/404")
    .then(response => {
        if (response.ok) {
            // Le serveur a répondu avec succès (code 2xx)
            return response.text(); // ou response.json() selon le contenu de la page
        } else {
            // Gérez d'autres codes d'erreur ici si nécessaire
            throw new Error(`Erreur HTTP ${response.status}`);
        }
    })
    .then(data => {
        // Traitez la réponse réussie ici
        console.log(data);
    })
    .catch(error => {
        console.error("Erreur lors de la requête:", error);
    });
    // Chargez la page d'erreur 404 en utilisant la fonction createErrorPage
    const errorContainer= document.createElement('div')
    errorContainer.id = 'login-error'
    createErrorPage(404, "Page Not Found", "The requested page could not be found.", errorContainer);
    // Annulez le chargement d'autres éléments en utilisant un return
    return;
}

function handleLogout() {
    const logoutButton = document.querySelector("#logoutForm button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            fetch("/logout", {
                method: "POST", // Use the appropriate HTTP method for your logout endpoint
            })
                .then(response => {
                    if (response.ok) {
                        var header = document.querySelector('header');
                        const mainContainerPost = document.querySelector('.main-container');
                        header.parentNode.removeChild(header)
                        mainContainerPost.parentNode.removeChild(mainContainerPost)
                        loadLoginPage()
                    }
                })
                .catch(error => {
                    console.error("Error during logout:", error);
                });
        });
    }
}

function backBtn() {
    document.querySelector('.logo').addEventListener('click', ()=>{
        var main = document.querySelector('.main-container')
        var header = document.querySelector('header')
        document.querySelector('body').removeChild(main)
        document.querySelector('body').removeChild(header)
        checkSessionOnLoad()
        changeRoute('/');
    })
}

function checkSessionOnLoad() {
    // Envoyez une requête au serveur pour vérifier la session
    fetch("/check_session")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadContentPage(data, loadPosts)
            } else {
                // Si la session n'est pas valide, chargez la page de connexion
                loadLoginPage();
            }
        })
        .catch(error => {
            console.error("Erreur lors de la vérification de la session:", error);
            // En cas d'erreur, chargez la page de connexion par défaut
            loadLoginPage();
        });
}

export function loadLoginPage() {
    // Créer l'élément de formulaire de connexion
    const loginElement = createLoginElement();
    // Ajouter l'élément de formulaire de connexion à la section principale
    body.appendChild(loginElement);
    // Ajoutez un gestionnaire d'événements pour le formulaire de login
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement
        var username = getUserInfos()[0]
        var password = getUserInfos()[1]
        // Envoyez les données de connexion au serveur
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                // Vérifiez la réponse du serveur
                if (data.success) {
                    body.removeChild(loginElement)
                    loadContentPage(data, loadPosts)
                } else {
                    // Affichez un message d'erreur, par exemple :
                    const loginError = document.getElementById("login-error");
                    if (loginError) {
                        loginError.style.display = "block";
                    }
                }
            })
            .catch(error => {
                console.error("Erreur lors de la connexion:", error);
            });
        });
    // Ajoutez un gestionnaire d'événements pour le lien d'inscription
    const openPopupSignupLink = document.getElementById("open-popup-signup-link");
    if (openPopupSignupLink) {
        console.log("okokokoko")
        openPopupSignupLink.addEventListener("click", function (event) {
            event.preventDefault();
            // Chargez le formulaire d'inscription à la place du formulaire de connexion
            if (loginElement) {
                body.removeChild(loginElement)
            }
            loadRegisterPage();
        });
    } else {
        console.log("vlvsd;lvd;f")
    }
}

function getUserInfos() {
    const usernameElement = document.getElementById("loginUsername");
    const passwordElement = document.getElementById("loginPassword");
    var username;
    var password;
    if (usernameElement) {
        username = usernameElement.value
    }
    if (passwordElement) {
        password = passwordElement.value
    }
    return [username, password]
}

function loadContentPage(data, func, isComment) {
    var main = document.createElement('main');
    main.classList.add('main-container');
    body.insertBefore(main, body.firstChild.nextSibling);

    const postContainer = document.createElement('section');
    postContainer.id = 'postContains';
    postContainer.classList.add("content");

    if (!isComment) {
        postContainer.appendChild(createPostButton(data.userID));
    }

    if (data.userID) {
        console.log('yessss');
        connectedUserName = data.name;
        connectedUserId = data.userID;
        createHeaderElement(data.name, data.userID, handleLogout);
    }
    backBtn()
    func(postContainer, data, main);

    // Insérez la section des catégories avant le postContainer
    loadCategories(postContainer, isComment);
    // Insérez le postContainer dans la section principale
    main.appendChild(postContainer);
}


export function loadRegisterPage() {
    // Créer l'élément de formulaire d'inscription
    const registerElement = createRegisterElement();
    body.appendChild(registerElement);
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Empêche le formulaire de se soumettre normalement
    
            // Récupérez les valeurs des champs du formulaire d'inscription
            const nameElement = document.querySelector('input[name="name"]');
            const usernameElement = document.querySelector('input[name="username"]');
            const emailElement = document.querySelector('input[name="email"]');
            const passwordElement = document.querySelector('input[name="password"]');
            const ageElement = document.querySelector('input[name="age"]');
            const genderElement = document.querySelector('select[name="gender"]');
            const firstNameElement = document.querySelector('input[name="first_name"]');
            const lastNameElement = document.querySelector('input[name="last_name"]');
    
            if (nameElement && usernameElement && emailElement && passwordElement && ageElement && genderElement && firstNameElement && lastNameElement) {
                const name = nameElement.value.trim();
                const username = usernameElement.value.trim();
                const email = emailElement.value.trim();
                const password = passwordElement.value;
                const age = parseInt(ageElement.value);
                const gender = genderElement.value;
                const firstName = firstNameElement.value.trim();
                const lastName = lastNameElement.value.trim();
    
                // Vérifier si les champs username, lastname, et name ne contiennent pas d'espaces
                if (!username || !lastName || !name || !firstName || !email) {
                    const registerError = document.getElementById("register-error");
                    if (registerError) {
                        registerError.style.color = "red";
                        registerError.innerText = "Les champs 'username', 'lastname' et 'name' ne doivent pas contenir d'espaces.";
                        registerError.style.display = "block";
                        return; // Arrêtez le traitement car la validation a échoué
                    }
                }
    
                // Envoyez les données au backend via une requête fetch
                fetch("/register", {    
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Name: name, Username: username, Email: email, Password: password, Age: age, Gender: gender, FirstName: firstName, LastName: lastName }),
                })
                    .then(response => response.json())
                    .then(data => {
                        // Vérifiez la réponse du serveur
                        if (data.success) {
                            // Affichez un message de succès
                            const registerError = document.getElementById("register-error");
                            if (registerError) {
                                registerError.style.display = "block";
                                registerError.style.color = "green";
                                registerError.textContent = "Inscription réussie";
                            }
                        } else {
                            // Afficher un message d'erreur en cas d'échec
                            const registerError = document.getElementById("register-error");
                            if (registerError) {
                                registerError.style.color = "red";
                                registerError.innerHTML = "Erreur lors de l'inscription: " + data.message;
                                registerError.style.display = "block";
                            }
                        }
                    })
                    .catch(error => {
                        console.error("Erreur lors de l'envoi de la requête:", error);
                    });
            } else {
                // Les champs du formulaire d'inscription ne sont pas disponibles, affichez un message d'erreur
                const registerError = document.getElementById("register-error");
                if (registerError) {
                    registerError.innerText = "Veuillez ne pas changer mon ID";
                    registerError.style.display = "block";
                }
            }
        });
    }
    

    // Ajoutez un gestionnaire d'événements pour le lien de connexion
    const openPopupLoginLink = document.getElementById("open-popup-login");
    if (openPopupLoginLink) {
        openPopupLoginLink.addEventListener("click", function (event) {
            event.preventDefault();
            if (registerElement) {
                body.removeChild(registerElement)
            }
            // Chargez le formulaire de connexion à la place du formulaire d'inscription
            loadLoginPage();
        });
    }
}

const logoutForm = document.getElementById("logoutForm");

if (logoutForm) {
    logoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                // Gérez la réponse du serveur
                if (data.success) {
                    // Affichez de nouveau la page de connexion
                    loadLoginPage();
                } else {
                    // En cas d'erreur, affichez un message ou effectuez une autre action
                    console.error("Erreur lors de la déconnexion:", data.message);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la déconnexion:", error);
            });
    });
}

var allposts;

function loadPosts(postContainer, data) {
    fetch("/get_all_posts")
        .then(response => response.json())
        .then(posts => {
            // Mettez à jour le contenu de la page avec les nouvelles publications
            allposts = posts
            updatePageContent(posts, postContainer);
            socketConnect(createPostElement);
            filterByCategories();
            displayMenuButton();
        })
        .catch(error => console.error("Erreur de récupération des publications:", error));
}

function loadCategories(postcontainer, isComment) {
    fetch("/get_asside_content")
        .then(response => response.json())
        .then(assideContent => {
            // Mettez à jour le contenu de la page avec les nouvelles catégories
            updateCategories(assideContent.Cat, postcontainer, isComment);
            updateFooter(assideContent.Use); // Passez les catégories au footer
            searchfieldFunc()
            friendsChat(getContentChat)
        })
        .catch(error => console.error("Erreur de récupération des catégories:", error));
}

var allPostElement
function updatePageContent(posts,postContainer) {
    allPostElement = []
    var main = document.querySelector('main');
    allposts.forEach(post => {
        const postElement = createPostElement(post);
        allPostElement.push(postElement)
        postContainer.appendChild(postElement);
        main.appendChild(postContainer)
        main.insertBefore(postContainer, main.firstChild.nextSibling)
    });
    listenCommentButton(posts)
    //socketConnect(createPostElement);
}

function listenCommentButton(posts) {
    var currentPosts
    if (allPostElement) {
        currentPosts = allPostElement
    }else{
        currentPosts = allElementPost
    }
    console.log('allpost   ', allElementPost);
    currentPosts.forEach(postElement => {
        const commentButton = postElement.querySelector('.comment');

        // Ajoutez un gestionnaire d'événements pour le clic sur le bouton (avec vérification)
        if (commentButton) {
            commentButton.addEventListener('click', function (event) {
                event.preventDefault();
                console.log(commentButton.id);
                fetchCommentPost(Number(commentButton.id))
            });
        }
    });
}

export function fetchCommentPost(postId, datas) {
    if (postId > 0) {
        fetch("/commentpost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId: postId }),
        })
            .then(response => response.json())
            .then(data => {
                if (data[0].PostId) {
                    changeRoute(`/comment?postId=${postId}`);
                    //createHeaderElement(datas.name, datas.userID, handleLogout);
                    //createCommentSection(data)
                    //loadCategories();
                    if (datas) {
                        data.name = datas.name
                        data.userID = datas.userID
                    }
                    console.log(data);
                    if (document.querySelector('.main-container')) {
                        body.removeChild(document.querySelector('.main-container'))
                    }
                    loadContentPage(data, createCommentSection, true)
                    
                }else{
                    loadErrorPage();
                }
                //socketConnect(createCommentSection);
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi de la requête:', error);
            });
    } else {
        loadErrorPage();
    }
}

function changeRoute(newRoute) {
    history.pushState(null, null, newRoute);
}

function updateCategories(categories, postContainer, isComment) {
    const categoriesContainer = document.createElement('aside');
    categoriesContainer.classList.add('categories', 'categoriesSection');
    const categoryElement = document.createElement('ul');
    categoryElement.classList.add('category-list');

    const categoriesArray = Array.isArray(categories) ? categories : [categories];

    if (windowWidth <= 768) {
        var btn = createButtonCategoryElement();
        btn.style.top = '40px';
        categoriesContainer.classList.remove('categories');
        categoriesContainer.classList.add('mobile-menu');
        categoriesContainer.appendChild(btn);
        categoryElement.style.marginTop = '-1em';
    } else {
        categoriesContainer.classList.remove('mobile-menu');
    }

    categoriesArray.forEach(category => {
        categoryElement.appendChild(createCategoryElement(category));
    });

    categoriesContainer.appendChild(categoryElement);

    // Insérez le conteneur des catégories avant le postContainer
    document.querySelector('main').insertBefore(categoriesContainer, postContainer);

    // Insertion conditionnelle du conteneur de commentaires
    if (!isComment) {
        var createPostButton = postContainer.querySelector('.profile-create-post');
        if (postContainer && createPostButton) {
            postContainer.insertBefore(formPost(categories), createPostButton.nextSibling);
        }
    }

    checkBtnCreatePost(postContainer);
}


function updateFooter(users) {
    createFooterElement(users);
}

function checkBtnCreatePost(postContainer) {
    const buttonPostForm = postContainer.querySelector('.create_post');
    console.log('voici le postcontainer ');
    if (buttonPostForm) {
        console.log('on recupere le bouton create post');
        //console.log(buttonPostForm);
        buttonPostForm.addEventListener('click', function () {
            const formPost = postContainer.querySelector('.formPost');
            buttonPostForm.parentNode.style.display = 'none';
            formPost.style.display = 'block';
            checkToUploadText()
            getContentPost()
        });
    }
}

//commentaire

export function createCommentSection(postContainer, comments, main) {
    // Vérifiez si comments est défini, n'est pas une chaîne vide et qu'il a une méthode forEach
    if (comments && Array.isArray(comments) && comments.length > 0) {
        // Ajoutez les commentaires à la section de commentaires
        comments.forEach(comment => {
           createComment(comment, postContainer, main);
        });
    } else {
        console.error("La variable 'comments' est vide ou n'est pas un tableau.");
        // Ajoutez un élément vide à postContainer
        const emptyPostElement = document.createElement('div');
        emptyPostElement.innerHTML = "Aucun commentaire disponible.";
        postContainer.appendChild(emptyPostElement);
    }
    getContentComment()
}
