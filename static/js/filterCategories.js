export function filterByCategories() {
  // Check if the device supports touch events
  // Get all checkboxes with the class "categoriesCheckbox"
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  if (isTouchDevice) {
    const checkboxes = document.querySelectorAll(".categoriesCheckbox");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", () => {
        checkbox.classList.toggle("active");
      });
    });
  }
  const checkboxes = document.querySelectorAll(".categoriesCheckbox");

  // Get all cards with the class "card"
  const cards = document.querySelectorAll(".card");

  // Add a change event listener to each checkbox
  var selectedCategory = [];
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (event) => {
      console.log('checked');
      // Get the value of the clicked checkbox
      const clickedCategory = event.target.value;
      // Check if the checkbox is checked
      if (event.target.checked) {
        selectedCategory.push(clickedCategory);
      } else {
        selectedCategory = selectedCategory.filter((cat) => cat !== clickedCategory);
      }
      // const selectedCategory = checkbox.value;
      // console.log(selectedCategory)
      // Loop through all cards
      var listParents = [];
      cards.forEach((card) => {
        let catArray = [];

        card.childNodes.forEach((fils) => {
          if (!fils.textContent.includes("\n")) {
            catArray.push(fils.textContent)
          }

        });
        selectedCategory.forEach((cat) => {
          // Check if the card contains the selected category in its text content
          if (catArray.includes(cat) || cat === "all") {
            listParents.push(card.parentElement);
            // card.parentElement.classList.remove("hide");
            // card.parentElement.classList.add("show");
            // console.log(catArray)
          } else {
            // card.parentElement.classList.remove("show");
            // card.parentElement.classList.add("hide");
          }
        })

      });
      if (selectedCategory.length !== 0 && listParents.length == 0) {
        cards.forEach((post) => {
          post.parentElement.classList.add("hide");
          post.parentElement.classList.remove("show");
        })
      } else if (selectedCategory.length == 0) {
        cards.forEach((post) => {
          post.parentElement.classList.remove("hide");
          post.parentElement.classList.add("show");
        })
      } else if (selectedCategory.length !== 0 && listParents.length !== 0) {
        cards.forEach((post) => {
          post.parentElement.classList.add("hide");
          post.parentElement.classList.remove("show");
        })
      }
      listParents.forEach((parent) => {
        if (parent) {
          parent.classList.remove("hide");
          parent.classList.add("show");
        }
      })
      // console.log(listParents)
    });
  });


}