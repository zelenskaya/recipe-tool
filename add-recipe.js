let recipes = [];
const recipesContainer = document.getElementById("recipe-list");
const storedRecipes = localStorage.getItem("recipesKey");
const saveButton = document.getElementById("save-button");
const titleInput = document.getElementById("recipe-title");
const descriptionInput = document.getElementById("recipe-description");
const categoryInput = document.getElementById("recipe-category");
const clearButton = document.getElementById("clear-button");


function leafMaker(text,className){
    const leaf=document.createElement("div");
    leaf.textContent=text;
    leaf.classList.add(className);
    return(leaf);
}

function displayRecipes(recipeArray){
    recipesContainer.textContent="";
    for (const recipeCount of recipeArray){
        const wrapper=document.createElement("div");
        wrapper.classList.add("recipe-card");
        wrapper.appendChild(leafMaker(recipeCount.title,"recipe-title"));
        wrapper.appendChild(leafMaker(recipeCount.description,"recipe-description"));
        wrapper.appendChild(leafMaker(recipeCount.category,"recipe-category"));
        recipesContainer.appendChild(wrapper);
    }

}

if (storedRecipes) {
    recipes = JSON.parse(storedRecipes)
    displayRecipes(recipes);
}

saveButton.addEventListener("click",writeEntry);

function writeEntry(){
    const recipe={
        title: titleInput.value,
        description: descriptionInput.value,
        category: categoryInput.value
    };
    recipes.push(recipe);
    displayRecipes(recipes);
    localStorage.setItem("recipesKey",JSON.stringify(recipes));
    titleInput.value="";
    descriptionInput.value="";
    categoryInput.value="";

    
}

clearButton.addEventListener("click",clearAll);

function clearAll(){
    localStorage.removeItem("recipesKey");
    recipes = [];
    displayRecipes(recipes);
}