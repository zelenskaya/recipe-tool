let recipes = [];
const recipesContainer = document.getElementById("recipe-list");
const storedRecipes = localStorage.getItem("recipesKey");
const recipesSection = document.getElementById("recipes-section");
const emptyState = document.getElementById("empty-state");
const backButton = document.getElementById("back-button");


function returnBack(){

    const cameFromApp = document.referrer.includes("index.html") || (document.referrer.includes("recipe.html") || (document.referrer.includes("add-recipe.html")));
    
    if (cameFromApp)
        {
            event.preventDefault()
            history.back();
    }
    else {
        
    }
}

function deleteRecipe(recipeIndex){
    recipes.splice(recipeIndex,1);
    localStorage.setItem("recipesKey", JSON.stringify(recipes));
}

function leafMaker(text,className){
    const leaf=document.createElement("div");
    leaf.textContent=text;
    leaf.classList.add(className);
    return(leaf);
}



function displayRecipes(recipeArray)
{
    if (recipesContainer) {
        recipesContainer.textContent="";
        if (recipeArray.length === 0){
            recipesSection.style.display = "none";
            emptyState.style.display = "";
            return;
        } else {
            emptyState.style.display = "none";
        }
        recipesSection.style.display = ""; 
        for (const [recipeIndex, recipe] of recipeArray.entries())
        {
            const wrapperRecipeCard=document.createElement("div");
            const wrapperRecipeActions = document.createElement("div");
            wrapperRecipeActions.classList.add("cluster--buttons");
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("button");
            editButton.classList.add("button--secondary");
            editButton.addEventListener("click", function(){
                location.href = `add-recipe.html?i=${recipeIndex}`;
            })
            const deleteButton = document.createElement ("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("button");
            deleteButton.classList.add("button--secondary");
            deleteButton.classList.add("button--danger");
            deleteButton.addEventListener("click", function(){
                const userConfirmed = confirm ("Are you sure you want to delete this recipe?");
                if (userConfirmed) {
                    deleteRecipe(recipeIndex);
                    displayRecipes(recipes);
                };
            
            });   
            const link=document.createElement("a");
            link.classList.add("recipe-card-top-part");
            wrapperRecipeCard.classList.add("recipe-card");
            link.appendChild(leafMaker(recipe.title,"recipe-title"));
            link.appendChild(leafMaker(recipe.description,"recipe-description"));
            const categoryLeaf = leafMaker(recipe.category, "recipe-category");
            categoryLeaf.classList.add(`category-${recipe.category.toLowerCase()}`)
            link.href=`recipe.html?i=${recipeIndex}`;
            link.appendChild(categoryLeaf);
            wrapperRecipeCard.appendChild(link);
            wrapperRecipeActions.appendChild(editButton);
            wrapperRecipeActions.appendChild(deleteButton);
            wrapperRecipeCard.appendChild(wrapperRecipeActions);
            recipesContainer.appendChild(wrapperRecipeCard);
        }
    }
   
    
    
       
    
    

}


if (storedRecipes) {
    recipes = JSON.parse(storedRecipes)
    
}
displayRecipes(recipes);
