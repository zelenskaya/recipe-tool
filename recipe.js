
let recipeParameters = new URLSearchParams(window.location.search);
const recipeNumber = Number(recipeParameters.get("i"));
backButton.addEventListener("click", returnBack);

const recipeItem = recipes[recipeNumber];
if (!recipeItem){
    location.href = "index.html";
} else {
   
    const recipeTitle = document.getElementById("recipe-title");
    recipeTitle.textContent = recipeItem.title;
    const recipeCategory = document.getElementById("recipe-category");
    recipeCategory.textContent = recipeItem.category;
    recipeCategory.classList.add(`category-${recipeItem.category.toLowerCase()}`);
    const recipeDescription = document.getElementById("recipe-description");
    recipeDescription.textContent = recipeItem.description;
    const deleteButton = document.getElementById("delete-button");
    deleteButton.addEventListener("click", handleDelete);

  

    function handleDelete(){
        const userConfirmed = confirm("Are you sure you want to delete this recipe?")
        if (userConfirmed){
            deleteRecipe(recipeNumber);
            location.href = "index.html"
        } 
    }

   
    const editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", editRecipe);
    function editRecipe(){
        
        location.href = `add-recipe.html?i=${recipeNumber}`
    }

   
    
}
