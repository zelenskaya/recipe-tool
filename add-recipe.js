
let currentIngredients = [];
const ingredientItem = document.getElementById("ingredient-item");
const addIngredientButton = document.getElementById("add-ingredient-button");
const chipsContainer = document.getElementById("chips-container");
let recipeParameters = new URLSearchParams(window.location.search);
let recipeId = recipeParameters.get("recipeId");
let liveValidationStarted = false;
const pageTitle = document.getElementById("page-title");
ingredientItem.addEventListener("keydown", handleKeyDown);
function handleKeyDown() {
            if(event.key === "Enter"){
                event.preventDefault();
                handleAddIngredient();
            }

        }

function renderIngredients(){
    chipsContainer.textContent = "";
    for (const i of currentIngredients){
        const ingredientChip = document.createElement("span");
        ingredientChip.classList.add("chip");
        ingredientChip.textContent=i;
        chipsContainer.append(ingredientChip);
        const removeIngredient = document.createElement("button");
        const removeIngredientIcon = document.createElement("i");
        removeIngredientIcon.setAttribute("data-lucide","x");
        removeIngredient.append(removeIngredientIcon);
        removeIngredient.addEventListener("click", handleRemoveIngredient);
        
       
        function handleRemoveIngredient(){
            const position = currentIngredients.indexOf(i);
            currentIngredients.splice(position,1);
            renderIngredients();
        }
        ingredientChip.append(removeIngredient);
    }
    lucide.createIcons();
}

addIngredientButton.addEventListener("click", handleAddIngredient);
function handleAddIngredient(){
    if (ingredientItem.value.trim!==""){
        currentIngredients.push(ingredientItem.value);
        ingredientItem.value="";
        renderIngredients();
    }
}

const validationRules = {
    title: {
        id: "recipe-title",
        message: "Please name your recipe",
        event: "input"
    },

    category: {
        id: "recipe-category",
        message: "Please select a category for your recipe",
        event: "change"
    }
};

const recipeItem = recipes.find(recipe => recipe.id === recipeId);



if (recipeItem!==undefined) {
    pageTitle.textContent = "Edit recipe";
}

const addRecipeForm = document.getElementById("add-recipe-form");
const titleInput = document.getElementById("recipe-title");
const descriptionInput = document.getElementById("recipe-description");
const categoryInput = document.getElementById("recipe-category");


backButton.addEventListener("click", returnBack);
function returnBack(){
    event.preventDefault();
    if (recipeItem) {
        
        if (
            titleInput.value !== recipeItem.title ||
            descriptionInput.value !== recipeItem.description ||
            categoryInput.value !== recipeItem.category ||
            JSON.stringify(currentIngredients) !== JSON.stringify(recipeItem.ingredients ?? [])
        ){
            const leavePage = confirm("Leave without saving?");

            if(!leavePage){
                return;
            }
        }
    }
    
    history.back();
}

if (recipeItem){
    titleInput.value=recipeItem.title;
    descriptionInput.value=recipeItem.description;
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
        description: descriptionInput.value,
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

