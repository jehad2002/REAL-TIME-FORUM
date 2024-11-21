import { createPostElement, createPostButton, formPost } from './components/postComponent.js';
import { createCategoryElement } from './components/categoriesComponent.js';
import { createFooterElement } from './components/footerComponent.js';
import { createHeaderElement } from './components/headerComponent.js';
import { createLoginElement } from './components/loginComponent.js';  // Assurez-vous d'importer la fonction de création du formulaire de login
import { checkToUploadText, socketConnect } from './formpost.js';

document.addEventListener("DOMContentLoaded", function () {
    // Chargez la page de login au chargement de la page
    checkSessionOnLoad();
});

function checkSessionOnLoad() {
    // Envoyez une requête au serveur pour vérifier la session
    fetch("/check_session")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Si la session est valide, affichez le contenu principal
                const loginSection = document.getElementById("loginSection");
                if (loginSection) {
                    loginSection.innerHTML = "";
                }
                const postContainer = document.getElementById("postContains");
                postContainer.innerHTML = "";
                postContainer.appendChild(createPostButton())


                // Chargez les publications et les catégories
                loadPosts();
                loadCategories();
                //console.log('data',data);
                // Mettez à jour l'en-tête avec le nom d'utilisateur
                createHeaderElement(data.name,data.userID);
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

function loadLoginPage() {
    // Créer l'élément de formulaire de connexion
    const loginElement = createLoginElement();

    // Ajouter l'élément de formulaire de connexion à la section principale
    const mainContainer = document.getElementById("loginSection");
    mainContainer.innerHTML = ""; // Supprimer le contenu existant
    mainContainer.appendChild(loginElement);

    // Ajoutez un gestionnaire d'événements pour le formulaire de login
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement

        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

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
                    // Connexion réussie, supprimez le conteneur de connexion
                    const loginSection = document.getElementById("loginSection");
                    if (loginSection) {
                        loginSection.innerHTML = "";
                    }

                    const postContainer = document.getElementById("postContains");
                    postContainer.innerHTML = "";
                    postContainer.appendChild(createPostButton())

                    // Chargez les publications et les catégories
                    loadPosts();
                    loadCategories();

                    // Mettez à jour l'en-tête avec le nom d'utilisateur
                    //console.log('data',data);
                    createHeaderElement(data.name,data.userID);
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

}

const logoutForm = document.getElementById("logoutForm");

if (logoutForm) {
    //console.log("al")
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
}else{
    //console.log("ei")
}

function loadPosts() {
    fetch("/get_all_posts")
        .then(response => response.json())
        .then(posts => {
            // Mettez à jour le contenu de la page avec les nouvelles publications
            //console.log(posts);
            updatePageContent(posts);
        })
        .catch(error => console.error("Erreur de récupération des publications:", error));
}

function loadCategories() {
    updateFooter(); // Passez les catégories au footer
    fetch("/get_all_categories")
        .then(response => response.json())
        .then(categories => {
            // Mettez à jour le contenu de la page avec les nouvelles catégories
            updateCategories(categories);
        })
        .catch(error => console.error("Erreur de récupération des catégories:", error));
}

function updatePageContent(posts) {
    // Parcourez toutes les publications et ajoutez-les au conteneur
    const postContainer = document.getElementById("postContains");
    //const postContainer = document.getElementById("postsSection");
    //postContainer.innerHTML = "";
    //postContainer.appendChild(createPostButton())
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postContainer.appendChild(postElement);
    });
    var element = socketConnect(createPostElement);
    //const buttonPostForm = document.getElementById('openPostForm');
    //buttonPostForm.insertBefore(element, )
    if (element) {
        document.getElementById('postContains').insertBefore(element, document.querySelector('.profile-create-post').nextSibling);
    }
}

function updateCategories(categories) {
    //const categoriesContainer = document.getElementById("categoriesSection");
    const categoriesContainer = document.querySelector(".categoriesSection");
    categoriesContainer.innerHTML = "";

    // Si categories n'est pas déjà un tableau, créez un tableau avec un seul élément
    const categoriesArray = Array.isArray(categories) ? categories : [categories];

    categoriesArray.forEach(category => {
        const categoryElement = createCategoryElement(category);
        categoriesContainer.appendChild(categoryElement);
    });
    document.getElementById('postContains').insertBefore(formPost(categories), document.querySelector('.profile-create-post').nextSibling);
    checkBtnCreatePost(categoriesArray)
}


function updateFooter() {
    createFooterElement();

}


function checkBtnCreatePost(categories) {
    const buttonPostForm = document.getElementById('openPostForm');
    if (buttonPostForm) {
        //console.log(buttonPostForm);
        buttonPostForm.addEventListener('click', function () {
            const formPost = document.getElementById('formPost');
            buttonPostForm.parentNode.style.display = 'none';
            formPost.style.display = 'block';
            checkToUploadText()
        });
    }
}
