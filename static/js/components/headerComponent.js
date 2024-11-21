export function createHeaderElement(name, userID, func) {
    var body = document.querySelector('body')
    // Créez un élément header pour représenter la section d'informations du pied de page
    const headerInfoElement = document.createElement("header");

    // Ajoutez le contenu de la section d'informations à l'élément header
    headerInfoElement.innerHTML = `
    <div class="logo">
      <img src="/static/image/forum.jpg" alt="Zone01 Logo"> 
    </div>
    <div class="seachbar search search-bar">
        <input type="text" placeholder="Rechercher...">
        <button ><i class="fas fa-search"></i> Research</button>
        <button id="show-input-button" class="active"><i class="fas fa-search"></i> Research</button>
    </div>
    <div id="chatbtn" class="search" style="display: none;">
        <button  class="show-input-button"><i class="fas fa-envelope"></i> Messages</button>
    </div>
    <div class="search" id="popup-input" style="display: none;">
        <input type="text" placeholder="Rechercher...">
        <button class="show-input-button"><i class="fas fa-search"></i> Research</button>
    </div> 
    <div class="login-link">
        <span id="userID" style="display: none;">${ `${userID}` }</span>
            <div style="width: auto;">
            <div class="user-dropdown">
                <i class="fas fa-user"></i>
                <span class="username">${ `${name}` }</span>
                <div style="width: 150px;" class="dropdown-content">
                    
                   <div   id="logoutForm" class="logout-container">
                    <button type="submit">
                     <i class="fas fa-sign-out-alt"></i> Logout
                     </button>
                     </div>
                </div>
            </div>
            </div>
        </div>
    `;

    // Remplacez l'ancien header par le nouvel élément header
    //const oldHeader = document.getElementById("headerSection");
    //const oldHeader = document.createElement('header')
    headerInfoElement.id = 'headerSection'
    //if (oldHeader) {
    //oldHeader.parentNode.replaceChild(headerInfoElement, oldHeader);
    //oldHeader.appendChild(headerInfoElement);
    //body.appendChild(oldHeader)
    body.insertBefore(headerInfoElement, body.firstChild);
    //}
    func()
}
