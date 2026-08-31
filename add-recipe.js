
let currentIngredients = [];
const ingredientItem = document.getElementById("ingredient-item");
const addRecipeAddIngredient = document.getElementById("add-recipe-add-ingredient");
const chipsContainer = document.getElementById("chips-container");
let recipeParameters = new URLSearchParams(window.location.search);
let recipeId = recipeParameters.get("recipeId");
let liveValidationStarted = false;
const addRecipeTitle = document.getElementById("add-recipe-title");
const addRecipeBackButton = document.getElementById("add-recipe-back-button");
addRecipeBackButton.addEventListener("click", confirmLeaveIfUnsaved);
const addRecipeBackCaption = document.getElementById("add-recipe-back-caption")
const addRecipeIngredientsLabel = document.getElementById("add-recipe-ingredients-label");
const recipeDescriptionLabel = document.getElementById("recipe-description-label");
const recipeDescriptionTextArea = document.getElementById("recipe-description-textarea");
const addRecipeCategory = document.getElementById("add-recipe-category");
const addRecipeSaveButton = document.getElementById("add-recipe-save-button");
const addRecipeTitleLabel = document.getElementById("add-recipe-title-label");
const categoryPlaceholder = document.getElementById("category-placeholder");
const categorySelect = document.getElementById("recipe-category");

for (const key in UI.categories) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = UI.categories[key];
    categorySelect.appendChild(option);
}


function applyAddRecipeStrings(){
    addRecipeBackCaption.textContent = UI.common.back;
    addRecipeTitle.textContent = UI.common.addRecipe;
    addRecipeIngredientsLabel.textContent = UI.recipe.ingredients;
    addRecipeAddIngredient.textContent = UI.common.add;
    recipeDescriptionLabel.textContent = UI.recipe.description;
    recipeDescriptionTextArea.placeholder = UI.recipe.descriptionPlaceholder;
    addRecipeCategory.textContent = UI.recipe.category;
    addRecipeSaveButton.textContent = UI.common.save;
    document.title = UI.addRecipe.metaTitleAdd;
    addRecipeTitleLabel.textContent = UI.recipe.title;
    categoryPlaceholder.textContent = UI.addRecipe.selectCategory;
}

function confirmLeaveIfUnsaved(event){
    
    if (recipeItem) {
        
        if (
            titleInput.value !== recipeItem.title ||
            recipeDescriptionTextArea.value !== recipeItem.description ||
            categoryInput.value !== recipeItem.category ||
            JSON.stringify(currentIngredients) !== JSON.stringify(recipeItem.ingredients ?? [])
        ){
            const leavePage = confirm(UI.common.confirmLeave);

            if(!leavePage){
                event.preventDefault();
                return;
            } 
        }
    }
    
    returnBack(event);
}


ingredientItem.addEventListener("keydown", handleKeyDown);
function handleKeyDown(event) {
            if(event.key === "Enter"){
                event.preventDefault();
                handleAddIngredient();
            }

        }

function renderIngredients(){
    chipsContainer.textContent = "";
    for (const [index,i] of currentIngredients.entries()){
        function handleRemoveIngredient(){
            
            currentIngredients.splice(index,1);
            renderIngredients();
        }

        const chip = makeChip(i, handleRemoveIngredient);
        chipsContainer.append(chip);

      
    }
    lucide.createIcons();
}

addRecipeAddIngredient.addEventListener("click", handleAddIngredient);
function handleAddIngredient(){
    const ingredientName = ingredientItem.value.trim().toLowerCase();
    if (ingredientName!==""){
        currentIngredients.push(ingredientName);
        ingredientItem.value="";
        renderIngredients();
    }
}

const validationRules = {
    title: {
        id: "recipe-title",
        message: UI.validationRules.title,
        event: "input"
    },

    category: {
        id: "recipe-category",
        message: UI.validationRules.category,
        event: "change"
    }
};

const recipeItem = recipes.find(recipe => recipe.id === recipeId);



if (recipeItem!==undefined) {
    addRecipeTitle.textContent = UI.common.editRecipe;
    document.title = UI.addRecipe.metaTitleEdit;
}

const addRecipeForm = document.getElementById("add-recipe-form");
const titleInput = document.getElementById("recipe-title");

const categoryInput = document.getElementById("recipe-category");






if (recipeItem){
    titleInput.value=recipeItem.title;
    recipeDescriptionTextArea.value=recipeItem.description;
    categoryInput.value=recipeItem.category;
    if(recipeItem.ingredients){
        currentIngredients = [...recipeItem.ingredients];
    }
    renderIngredients();
}

function inputIsValid(formFieldID, validationMessage) {
    const formFieldElement = document.getElementById(formFieldID);

    const errorElement =
        formFieldElement
            .closest(".form-field")
            .querySelector(".form-field_error");

    errorElement.textContent = "";        

    if (!formFieldElement.checkValidity()) {
        errorElement.textContent = validationMessage;
        return false;
    }

   
    return true;
}

function formIsValid(){
    const titleIsValid = inputIsValid(validationRules.title.id, validationRules.title.message);
    const categoryIsValid = inputIsValid(validationRules.category.id, validationRules.category.message);
    
    return titleIsValid && categoryIsValid;
}

addRecipeForm.addEventListener("submit",handleSubmit);

function handleSubmit(event){
    event.preventDefault();
    
    if (formIsValid()) {
        let recipeId;

         if (recipeItem){
            
            recipeId = recipeItem.id;
        }
            
         else
        {
            
            recipeId= crypto.randomUUID();
        }

        const recipe={
        title: titleInput.value,
        description: recipeDescriptionTextArea.value,
        category: categoryInput.value,
        id: recipeId,
        ingredients: currentIngredients
        };

        if (recipeItem){
            const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
            recipes[recipeIndex]=recipe;
           
        }
            
         else
        {
            recipes.push(recipe);
            
        }
       
        
        localStorage.setItem("recipesKey",JSON.stringify(recipes));
        
        location.href="index.html";
    }

    else {
        if (!liveValidationStarted) {
                liveValidationStarted = true;
                titleInput.addEventListener(validationRules.title.event, function () {
                    inputIsValid(validationRules.title.id, validationRules.title.message);
                } );
                categoryInput.addEventListener(validationRules.category.event, function(){
                    inputIsValid(validationRules.category.id, validationRules.category.message);
            });
        }

    }    
}

applyAddRecipeStrings();