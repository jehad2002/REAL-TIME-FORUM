// Fonction pour créer l'élément de création de post
export function createPostForm() {
    // Création de l'élément div avec la classe "profile-create-post"
    const profileCreatePost = document.createElement("div");
    profileCreatePost.classList.add("profile-create-post");

    // Création de l'élément div avec la classe "profile-image"
    const profileImage = document.createElement("div");
    profileImage.classList.add("profile-image");

    // Ajout des éléments enfants à "profileImage"
    profileImage.innerHTML = '<div class="circle"></div><div class="image-container"></div>';

    // Ajout de "profileImage" à "profileCreatePost"
    profileCreatePost.appendChild(profileImage);

    // Création de l'élément div avec la classe "input-box"
    const inputBox = document.createElement("div");
    inputBox.classList.add("input-box");

    // Création de l'élément input avec la classe "input-text"
    const inputText = document.createElement("input");
    inputText.classList.add("input-text");
    inputText.type = "text";
    inputText.value = "Let’s share what's going on your mind...";
    inputText.disabled = true;

    // Ajout de "inputText" à "inputBox"
    inputBox.appendChild(inputText);

    // Ajout de "inputBox" à "profileCreatePost"
    profileCreatePost.appendChild(inputBox);

    // Création de l'élément button avec la classe "create_post open-popup" et l'id "openPostForm"
    const createPostButton = document.createElement("button");
    createPostButton.classList.add("create_post", "open-popup");
    createPostButton.id = "openPostForm";
    createPostButton.style.display = "flex";
    createPostButton.style.flexDirection = "row";
    createPostButton.style.alignItems = "center";

    // Ajout de l'élément "a" avec la classe "create-post-button" à "createPostButton"
    const createPostAnchor = document.createElement("a");
    createPostAnchor.classList.add("create-post-button");
    createPostAnchor.textContent = "Create Post";

    // Ajout de l'élément "i" avec les classes "fa-solid", "fa-plus", "fa-beat", "fa-2xl" et la couleur rouge à "createPostButton"
    const plusIcon = document.createElement("i");
    plusIcon.classList.add("fa-solid", "fa-plus", "fa-beat", "fa-2xl");
    plusIcon.style.color = "red";

    // Ajout de "createPostAnchor" et "plusIcon" à "createPostButton"
    createPostButton.appendChild(createPostAnchor);
    createPostButton.appendChild(plusIcon);

    // Ajout de "createPostButton" à "profileCreatePost"
    profileCreatePost.appendChild(createPostButton);

    // Création de l'élément form avec l'action "/createpost", l'id "formPost", la méthode "post" et l'encodage "multipart/form-data"
    const formPost = document.createElement("form");
    formPost.action = "/createpost";
    
    
    
    
    formPost.id = "formPost";
    formPost.method = "post";
    formPost.enctype = "multipart/form-data";

    // Création de l'élément div avec la classe "postContain"
    const postContain = document.createElement("div");
    postContain.classList.add("postContain");

    // Ajout de l'élément span avec la classe "cancelPostForm" à "postContain"
    const cancelPostForm = document.createElement("span");
    cancelPostForm.classList.add("cancelPostForm");
    cancelPostForm.innerHTML = "&times;";

    // Création de l'élément section avec la classe "headPost"
    const headPost = document.createElement("section");
    headPost.classList.add("headPost");

    // Création de trois éléments span avec différentes configurations
    const postText = createOptionPost("postText", "fas fa-pencil-alt", "Post", "3px solid blue");
    const openUploadImVid = createOptionPost("openUploadImVid", "fas fa-camera", "Image & Video", "1px solid lightgray");
    const checkCategories = createCheckCategories();

    // Ajout de ces trois éléments à "headPost"
    headPost.appendChild(postText);
    headPost.appendChild(openUploadImVid);
    headPost.appendChild(checkCategories);

    // Création de l'élément section avec la classe "titlePost"
    const titlePost = document.createElement("section");

    // Création de l'élément input avec les attributs spécifiés
    const titleInput = document.createElement("input");
    titleInput.value = "";
    titleInput.type = "text";
    titleInput.minlength = "5";
    titleInput.maxlength = "100";
    titleInput.placeholder = "Title 100 caractere max";
    titleInput.name = "title";
    titleInput.id = "titleInput";
    titleInput.style.height = "40px";
    titleInput.style.borderRadius = "10px";
    titleInput.required = true;

    // Ajout de "titleInput" à "titlePost"
    titlePost.appendChild(titleInput);

    // Création de l'élément section avec la classe "contentPost"
    const contentPost = document.createElement("section");

    // Création de l'élément textarea avec les attributs spécifiés
    const textareaField = document.createElement("textarea");
    textareaField.name = "content";
    textareaField.minlength = "5";
    textareaField.setAttribute("required", true);
    textareaField.maxlength = "1500";
    textareaField.id = "textareaField";
    textareaField.cols = "49";
    textareaField.rows = "14";
    textareaField.placeholder = "Write your message post  in minimum 5 and  1500 caractere max...";

    // Création de l'élément div avec la classe "UploadImVid"
    const uploadImVid = document.createElement("div");
    uploadImVid.classList.add("UploadImVid");

    // Création de l'élément label avec l'attribut for="fileInput"
    const labelForFileInput = document.createElement("label");
    labelForFileInput.for = "fileInput";
    labelForFileInput.textContent = "Choose an image or video:";

    // Création de l'élément input avec les attributs spécifiés
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "fileInput";
    fileInput.accept = "image/*, video/*";
    fileInput.name = "uploadsFile";

    // Ajout de "textareaField" à "contentPost"
    contentPost.appendChild(textareaField);
    // Ajout de "labelForFileInput" et "fileInput" à "uploadImVid"
    uploadImVid.appendChild(labelForFileInput);
    uploadImVid.appendChild(fileInput);
    // Ajout de "uploadImVid" à "contentPost"
    contentPost.appendChild(uploadImVid);

    // Ajout de "cancelPostForm", "headPost", "titlePost" et "contentPost" à "postContain"
    postContain.appendChild(cancelPostForm);
    postContain.appendChild(headPost);
    postContain.appendChild(titlePost);
    postContain.appendChild(contentPost);

    // Création de l'élément div avec le style spécifié
    const flexDiv = document.createElement("div");
    flexDiv.style.display = "flex";

    // Création de l'élément button avec le type "submit" et l'id "buttonSubmitFormPrincial"
    const buttonSubmitFormPrincial = document.createElement("button");
    buttonSubmitFormPrincial.type = "submit";
    buttonSubmitFormPrincial.id = "buttonSubmitFormPrincial";
    buttonSubmitFormPrincial.textContent = "Create Post";

    // Ajout de "buttonSubmitFormPrincial" à "flexDiv"
    flexDiv.appendChild(buttonSubmitFormPrincial);

    // Création de l'élément "a"
    const aElement = document.createElement("a");
    // Ajout de "flexDiv" à "aElement"
    aElement.appendChild(flexDiv);

    // Ajout de "aElement" à "formPost"
    formPost.appendChild(aElement);

    // Ajout de "postContain" à "formPost"
    formPost.appendChild(postContain);

    // Ajout de "formPost" à "profileCreatePost"
    profileCreatePost.appendChild(formPost);

    // Retourne l'élément "profileCreatePost"
    return profileCreatePost;
}

// Fonction pour créer un élément span avec la classe "optionPost"
export function createOptionPost(id, iconClass, linkText, borderBottom) {
    const optionPost = document.createElement("span");
    optionPost.id = id;
    optionPost.classList.add("optionPost");
    optionPost.style.borderBottom = borderBottom;

    const aElement = document.createElement("a");
    aElement.href = "#";

    const iElement = document.createElement("i");
    iElement.classList.add(iconClass);
    iElement.textContent = " " + linkText;

    aElement.appendChild(iElement);
    optionPost.appendChild(aElement);

    return optionPost;
}

// Fonction pour créer l'élément span avec la classe "check-categories"
export function createCheckCategories() {
    const checkCategories = document.createElement("span");
    checkCategories.classList.add("check-categories");
    checkCategories.onclick = toggleCheckboxDropdown;

    const checkboxDropdown = document.createElement("div");
    checkboxDropdown.classList.add("checkbox-dropdown");

    const aElement = document.createElement("a");
    aElement.href = "#";

    const iElement = document.createElement("i");
    iElement.classList.add("fas", "fa-list");
    iElement.textContent = " Select categories";

    aElement.appendChild(iElement);
    checkboxDropdown.appendChild(aElement);

    const checkboxDropdownContent = document.createElement("div");
    checkboxDropdownContent.id = "checkbox-dropdown-content";
    checkboxDropdownContent.classList.add("checkbox-dropdown-content");

    // Replacez le contenu ci-dessous par votre logique pour ajouter les catégories
    const categories = ["Category1", "Category2", "Category3"];
    categories.forEach(category => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "categorieChecked";
        input.onchange = handleCheckboxChange();
        input.value = category;
        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + category));
        checkboxDropdownContent.appendChild(label);
    });

    checkboxDropdown.appendChild(checkboxDropdownContent);
    checkCategories.appendChild(checkboxDropdown);

    return checkCategories;
}


