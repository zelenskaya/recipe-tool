
let recipeParameters = new URLSearchParams(window.location.search);
let iValue = recipeParameters.get("i");
let recipeNumber;
let recipeItem;
let liveValidationStarted = false;

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
if(iValue){
recipeNumber = Number(iValue);
recipeItem = recipes[recipeNumber];
} else {
    recipeNumber=null;
    recipeItem=null;
}

const addRecipeForm = document.getElementById("add-recipe-form");
const titleInput = document.getElementById("recipe-title");
const descriptionInput = document.getElementById("recipe-description");
const categoryInput = document.getElementById("recipe-category");


backButton.addEventListener("click", returnBack);
function returnBack(){
    history.back();
}

if (recipeItem){
    titleInput.value=recipeItem.title;
    descriptionInput.value=recipeItem.description;
    categoryInput.value=recipeItem.category;
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
        const recipe={
        title: titleInput.value,
        description: descriptionInput.value,
        category: categoryInput.value
        };
        if (recipeItem){
            recipes[recipeNumber]=recipe;
        } else
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

