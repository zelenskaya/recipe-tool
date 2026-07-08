
let recipeParameters = new URLSearchParams(window.location.search);
let iValue = recipeParameters.get("i");
let recipeNumber;
let recipeItem;
if(iValue){
recipeNumber = Number(iValue);
recipeItem = recipes[recipeNumber];
} else {
    recipeNumber=null;
    recipeItem=null;
}

const saveButton = document.getElementById("save-button");
const titleInput = document.getElementById("recipe-title");
const descriptionInput = document.getElementById("recipe-description");
const categoryInput = document.getElementById("recipe-category");
const backButton = document.getElementById("back-button");

backButton.addEventListener("click", returnBack);
function returnBack(){
    history.back();
}

if (recipeItem){
    titleInput.value=recipeItem.title;
    descriptionInput.value=recipeItem.description;
    categoryInput.value=recipeItem.category;
}


saveButton.addEventListener("click",writeEntry);

function writeEntry(){
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
    titleInput.value="";
    descriptionInput.value="";
    categoryInput.value="";
    location.href="index.html";
    
    
}

