
let recipeParameters = new URLSearchParams(window.location.search);

const recipeId = recipeParameters.get("recipeId");
backButton.addEventListener("click", returnBack);

const recipeItem = recipes.find(recipe => recipe.id === recipeId);


if (recipeItem === undefined){
    location.href = "index.html";
} else {
    const ingredientList = document.getElementById("ingredient-list");
    if ((recipeItem.ingredients)&&(recipeItem.ingredients.length>0)){
        for (const i of recipeItem.ingredients){
            const ingredient = document.createElement("li");
            ingredient.textContent = i;
            ingredientList.append(ingredient);
        }

    }

    const recipeTitle = document.getElementById("recipe-title");
    recipeTitle.textContent = recipeItem.title;
    const recipeCategory = document.getElementById("recipe-category");
    recipeCategory.textContent = recipeItem.category;
    recipeCategory.classList.add(`category-${recipeItem.category.toLowerCase()}`);
    const recipeDescription = document.getElementById("recipe-description-text");
    recipeDescription.textContent = recipeItem.description;
    const deleteButton = document.getElementById("delete-button");
    deleteButton.addEventListener("click", handleDelete);

  

    function handleDelete(){
        const userConfirmed = confirm("Are you sure you want to delete this recipe?")
        if (userConfirmed){
            deleteRecipe(recipeId);
            location.href = "index.html"
        } 
    }

   
    const editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", editRecipe);
    function editRecipe(){
        
        location.href = `add-recipe.html?recipeId=${recipeId}`
    }

   
    
}
