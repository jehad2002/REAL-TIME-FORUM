//document.addEventListener('DOMContentLoaded', 
export function displayMenuButton() {
    const menuButton = document.querySelector('.menu-button');
    const mobileCategoryList = document.querySelector('.mobile-menu .category-list');
    //console.log('isclicked');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            mobileCategoryList.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }
}
//);

//$(document).ready(function () {
//    // Lorsque le bouton "Reply" est cliqué
//    $(document).on("click", ".reply-button", function () {
//        // Récupérer l'ID du commentaire à partir de l'attribut data-comment-id
//        var commentID = $(this).attr("data-comment-id");
//        // Trouver le formulaire de réponse associé au commentaire spécifique
//        var replyForm = $(".comment[data-comment-id='" + commentID + "']").find(".reply-form");
//        // Afficher ou cacher le formulaire
//        replyForm.toggleClass("hidden");
//    });
//});

const showInputButton = document.getElementById("show-input-button");
const popupInput = document.getElementById("popup-input");

//document.addEventListener("click", (e) => {
//    if (e.target.parentNode.classList.contains("search-bar") && e.target.classList.contains("active")) {
//        popupInput.style.display = "block";
//    }else{
//        popupInput.style.display = "none";
//    }
    
//});
window.addEventListener("resize", () => {
    if (window.innerWidth <= 420) {
        popupInput.style.display = "none";
    }
});

    // Supposons que vous avez des liens de catégorie avec des classes ".category-link" et des publications avec des classes ".post-item".
document.querySelectorAll('.category-link').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCategory = link.getAttribute('data-category'); // Obtenez la catégorie sélectionnée

        // Cacher toutes les publications en ajoutant la classe "hidden"
        document.querySelectorAll('.post-item').forEach((post) => {
            post.classList.add('hidden');
        });

        // Afficher les publications de la catégorie sélectionnée en retirant la classe "hidden"
        document.querySelectorAll(`.post-item[data-category="${selectedCategory}"]`).forEach((post) => {
            post.classList.remove('hidden');
        });
    });
});

// Sélectionnez tous les boutons "Voir les réponses"
const showRepliesButtons = document.querySelectorAll(".show-replies-button");

// Parcourez chaque bouton et vérifiez si le commentaire parent a des enfants
showRepliesButtons.forEach(button => {
    // Sélectionnez le commentaire parent
    const parentComment = button.closest(".comment");
    // Sélectionnez la liste des sous-commentaires
    const subCommentsList = parentComment.querySelector(".sub-comments");
    //console.log(parentComment.nextElementSibling);
    // Si la liste des sous-commentaires existe et contient des éléments, montrez le bouton
    if (parentComment.nextElementSibling) {
        button.style.display = "inline-block";
        parentComment.nextElementSibling.style.display="none";
        button.addEventListener('click', (e)=>{
            if (!button.classList.contains("active")) {
                parentComment.nextElementSibling.style.display="block";
                button.classList.add('active');
                
            }else{
                parentComment.nextElementSibling.style.display="none";
                button.classList.remove('active');
            }
        });
    } else {
        button.style.display = "none";
    }
});


