export function createCategoryElement(categories) {
    // Créez un élément aside pour représenter la liste de catégories
    
    const categoryElement = document.createElement("li");
    //categoryElement.style.width="auto"
    //categoryElement.style.height="auto"
    // Ajoutez la liste de catégories à l'élément aside
    categoryElement.innerHTML = `
        <label>
            <input type="checkbox" name="category" class="categoriesCheckbox" value="${categories.Libelle}">
            <span>${categories.Icon}</span> ${categories.Libelle}
        </label>
    `;
    return categoryElement;
}

export function createButtonCategoryElement() {
    var button = document.createElement('button')
    button.classList.add('menu-button')
    button.id = 'showCategories'
    button.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
        <h3>categories</h3>
        `;
    return button;
}
