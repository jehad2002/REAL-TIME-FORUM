export function createErrorPage(statusCode, message, description, container) {
    // Créez ici le contenu de la page d'erreur en utilisant les paramètres fournis
    const errorElement = document.createElement("div");
    errorElement.style.textAlign = "center";
    errorElement.innerHTML = `
        <h1 style="font-size: 800%; color: orangered; margin-bottom: 0px;"> ${statusCode} </h1>
        <h2 style="font-size: 700%; color: orangered; margin-top: 0px; margin-bottom: 0px;"> ${message} </h2>
        <p> ${description} </p>
    `;

    // Ajoutez le contenu de la page d'erreur au conteneur spécifié
    //container.innerHTML = "";
    container.appendChild(errorElement);
    document.querySelector('body').appendChild(container)
}