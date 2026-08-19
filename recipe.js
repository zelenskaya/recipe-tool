
const recipeParameters = new URLSearchParams(window.location.search);
const recipeEditButton = document.getElementById("recipe-edit-button");
const recipeDeleteButton = document.getElementById("recipe-delete-button");
const recipeTitle = document.getElementById("recipe-title");
const recipeCategory = document.getElementById("recipe-category");
const recipeDescription = document.getElementById("recipe-description-text");
const recipeBackCaption = document.getElementById("recipe-back-caption");
const recipePageBackButton = document.getElementById("recipe-page-back-button");
const recipeMethodLabel = document.getElementById("recipe-method-label");
        
    

const recipeId = recipeParameters.get("recipeId");
recipePageBackButton.addEventListener("click", returnBack);

const recipeItem = recipes.find(recipe => recipe.id === recipeId);


function applyRecipeStrings(){
    document.title = UI.recipe.metaTitle;
    recipeBackCaption.textContent = UI.common.back;
    recipeEditButton.textContent = UI.common.edit;
    recipeDeleteButton.textContent = UI.common.delete;
    recipeMethodLabel.textContent = UI.recipe.method;
    

}


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

   
    recipeTitle.textContent = recipeItem.title;
    recipeCategory.textContent = recipeItem.category;
    recipeCategory.classList.add(`category-${recipeItem.category.toLowerCase()}`);
    recipeDescription.textContent = recipeItem.description;
    recipeDeleteButton.addEventListener("click", handleDelete);

  

    function handleDelete(){
        const userConfirmed = confirm(UI.common.confirmDelete);
        if (userConfirmed){
            deleteRecipe(recipeId);
            location.href = "index.html"
        } 
    }

   
    recipeEditButton.addEventListener("click", editRecipe);
    function editRecipe(){
        
        location.href = `add-recipe.html?recipeId=${recipeId}`
    }

   
    
}

applyRecipeStrings();