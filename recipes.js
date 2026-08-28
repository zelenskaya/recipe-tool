let recipes = [];
const searchInput = document.getElementById("search");
const searchForm = document.getElementById("search-form");
if (searchForm){
    searchForm.addEventListener("submit", handleSearch);
}


function applyNavStrings() {
       searchInput.placeholder = UI.common.search;

}

function handleSearch(event) {
    event.preventDefault();
    const searchQuery = new URLSearchParams(location.search).get('q');
    const trimmedSearchQuery = searchInput.value.trim();
    
    location = 'search.html?q=' + encodeURIComponent(trimmedSearchQuery); 
}

function getRecipes(){
    let storedRecipes = localStorage.getItem("recipesKey");
    if (storedRecipes === null){
    
    recipes = seedRecipes;
    localStorage.setItem("recipesKey",JSON.stringify(seedRecipes));
    }  else {
    recipes = JSON.parse(storedRecipes);
    }
    return recipes;
}

recipes=getRecipes();

const recipesContainer = document.getElementById("recipe-list");

const recipesSection = document.getElementById("recipes-section");
const indexEmptyState = document.getElementById("index-empty-state");
const indexEmptyStateTitle = document.getElementById("index-empty-state-title");
const indexEmptyStateMessage = document.getElementById("index-empty-state-message");

let recipesSectionTitle = document.getElementById("recipes-section-title");
const indexAddRecipeButton = document.getElementById("index-add-recipe-button");




function makeRecipeCard(recipe){

    const wrapperRecipeCard=document.createElement("div");
    const link = document.createElement("a");
    link.classList.add("recipe-card-top-part");
    wrapperRecipeCard.classList.add("recipe-card");
    link.appendChild(leafMaker(recipe.title,"recipe-title"));
    link.appendChild(leafMaker(recipe.description,"recipe-description"));
    const categoryLeaf = leafMaker(recipe.category, "recipe-category");
    const categoryToLowerCase = recipe.category?.toLowerCase();
    if (categoryToLowerCase) {
                            categoryLeaf.classList.add(`category-${categoryToLowerCase}`);
                        }
                        
    link.href=`recipe.html?recipeId=${recipe.id}`;
    link.appendChild(categoryLeaf);
    wrapperRecipeCard.appendChild(link);     
    return (wrapperRecipeCard);  
    
}


function returnBack(event)
{
    const cameFromApp = document.referrer.startsWith(window.location.origin);
    if (cameFromApp)
        {
            event.preventDefault()
            history.back();
    }
    else {
        
    }
}

function deleteRecipe(recipeId){
    const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
    if (recipeIndex !== -1) {
        recipes.splice(recipeIndex,1);
        localStorage.setItem("recipesKey", JSON.stringify(recipes));
    }
   
}

function leafMaker(text,className){
    const leaf=document.createElement("div");
    leaf.textContent=text;
    leaf.classList.add(className);
    return(leaf);
}



function displayRecipes(recipesView)
{
    const recipeArray = recipesView.recipes;
    

    if (recipesContainer)
        {
            recipesContainer.textContent="";
            if (recipeArray.length === 0)
                {
                   recipesSection.style.display = "none";
                    indexEmptyState.style.display = "";
                    indexEmptyStateTitle.textContent = UI.library.nothingFoundTitle;
                    indexEmptyStateMessage.textContent = UI.library.nothingFoundMessage;
                    indexAddRecipeButton.classList.add("button--secondary");
                    indexAddRecipeButton.classList.remove("button--primary");
                    return;
                }
             
                {
                    indexEmptyState.style.display = "none";
                    indexAddRecipeButton.classList.add("button--primary");
                    indexAddRecipeButton.classList.remove("button--secondary");
                    recipesSectionTitle.textContent = UI.index.recipesSectionTitle;
                    
                    recipesSection.style.display = ""; 
                    for (const recipe of recipeArray)
                    {
                        const wrapperRecipeCard = makeRecipeCard(recipe);
                        const wrapperRecipeActions = document.createElement("div");
                        wrapperRecipeActions.classList.add("cluster--buttons");
                        const editButton = document.createElement("button");
                        editButton.textContent = UI.common.edit;
                        editButton.classList.add("button");
                        editButton.classList.add("button--secondary");
                        editButton.addEventListener("click", function(){
                            location.href = `add-recipe.html?recipeId=${recipe.id}`;
                        })
                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = UI.common.delete;
                        deleteButton.classList.add("button");
                        deleteButton.classList.add("button--secondary");
                        deleteButton.classList.add("button--danger");
                        deleteButton.addEventListener("click", function(){
                            const userConfirmed = confirm (UI.common.confirmDelete);
                            if (userConfirmed) {
                                deleteRecipe(recipe.id);
                                displayRecipes({recipes: recipes});
                                
                                
                            }
                        
                        });   
                      
                       
                        wrapperRecipeActions.appendChild(editButton);
                        wrapperRecipeActions.appendChild(deleteButton);
                        wrapperRecipeCard.appendChild(wrapperRecipeActions);
                        recipesContainer.appendChild(wrapperRecipeCard);        
                    }
                }
        }

    }


displayRecipes({recipes:recipes});

applyNavStrings();