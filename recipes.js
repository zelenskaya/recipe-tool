let recipes = [];
const recipesContainer = document.getElementById("recipe-list");
const storedRecipes = localStorage.getItem("recipesKey");
const recipesSection = document.getElementById("recipes-section");
const emptyState = document.getElementById("empty-state");
const emptyStateTitle = document.getElementById("empty-state-title");
const emptyStateMessage = document.getElementById("empty-state-message");
const emptyStateClearSearch = document.getElementById("empty-state-clear-search");
const backButton = document.getElementById("back-button");
let recipeTitle = document.getElementById("recipes-section-title");
const addRecipeButton = document.getElementById("add-recipe-button");
const searchResultsClearSearchButton = document.getElementById("search-results-clear-search");


function returnBack()
{
    const cameFromApp = document.referrer.includes("index.html") || (document.referrer.includes("recipe.html")) || (document.referrer.includes("add-recipe.html"));
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
    const isFiltered = recipesView.isFiltered;
    const searchText = recipesView.searchText;

    if (recipesContainer)
        {
            recipesContainer.textContent="";
            if (recipeArray.length === 0)
                {
                    if (isFiltered && (recipes.length > 0))
                        {
                            recipesSection.style.display = "none";
                            emptyState.style.display = "";
                            emptyStateTitle.textContent = "No matching results";
                            emptyStateMessage.textContent = "Try searching in a different way."
                            emptyStateClearSearch.style.display = "";
                            emptyStateClearSearch.classList.add("button");
                            emptyStateClearSearch.classList.add("button--primary");
                            addRecipeButton.classList.add("button--secondary");
                            addRecipeButton.classList.remove("button--primary");
                            searchResultsClearSearchButton.style.display = "";
                        }
                        else 
                        {
                                recipesSection.style.display = "none";
                                emptyState.style.display = "";
                                emptyStateTitle.textContent = "No recipes yet";
                                emptyStateMessage.textContent = "Start building your cookbook."
                                emptyStateClearSearch.style.display = "none";
                                addRecipeButton.classList.add("button--primary");
                                addRecipeButton.classList.remove("button--secondary");
                        }
                        return;
                }
             else 
                {
                    emptyState.style.display = "none";
                    addRecipeButton.classList.add("button--primary");
                                addRecipeButton.classList.remove("button--secondary");
                    if (isFiltered){
                        searchResultsClearSearchButton.style.display="";
                        if (recipeArray.length === 1)
                        {
                            recipeTitle.textContent = "1 recipe found";
                            
                        }
                    else
                        {
                            recipeTitle.textContent = recipeArray.length + " recipes found matching the search for " + searchText ;
                        }

                    }
                    else {
                        recipeTitle.textContent = "Recipes";
                        searchResultsClearSearchButton.style.display = "none";
                    }
                    recipesSection.style.display = ""; 
                    for (const recipe of recipeArray)
                    {
                        const wrapperRecipeCard=document.createElement("div");
                        const wrapperRecipeActions = document.createElement("div");
                        wrapperRecipeActions.classList.add("cluster--buttons");
                        const editButton = document.createElement("button");
                        editButton.textContent = "Edit";
                        editButton.classList.add("button");
                        editButton.classList.add("button--secondary");
                        editButton.addEventListener("click", function(){
                            location.href = `add-recipe.html?recipeId=${recipe.id}`;
                        })
                        const deleteButton = document.createElement ("button");
                        deleteButton.textContent = "Delete";
                        deleteButton.classList.add("button");
                        deleteButton.classList.add("button--secondary");
                        deleteButton.classList.add("button--danger");
                        deleteButton.addEventListener("click", function(){
                            const userConfirmed = confirm ("Are you sure you want to delete this recipe?");
                            if (userConfirmed) {
                                deleteRecipe(recipe.id);
                                if (isFiltered) {
                                    filterAndDisplay(searchText); 
                                }
                                else
                                {
                                    displayRecipes({recipes:recipes, isFiltered: false, searchText: ""});
                                }
                                
                            };
                        
                        });   
                        const link = document.createElement("a");
                        link.classList.add("recipe-card-top-part");
                        wrapperRecipeCard.classList.add("recipe-card");
                        link.appendChild(leafMaker(recipe.title,"recipe-title"));
                        link.appendChild(leafMaker(recipe.description,"recipe-description"));
                        const categoryLeaf = leafMaker(recipe.category, "recipe-category");
                        categoryLeaf.classList.add(`category-${recipe.category.toLowerCase()}`)
                        link.href=`recipe.html?recipeId=${recipe.id}`;
                        link.appendChild(categoryLeaf);
                        wrapperRecipeCard.appendChild(link);
                        wrapperRecipeActions.appendChild(editButton);
                        wrapperRecipeActions.appendChild(deleteButton);
                        wrapperRecipeCard.appendChild(wrapperRecipeActions);
                        recipesContainer.appendChild(wrapperRecipeCard);        
                    }
                }
        }

    }
if (storedRecipes) {
    recipes = JSON.parse(storedRecipes)
    
}

displayRecipes({recipes:recipes, isFiltered: false, searchText: ""});
