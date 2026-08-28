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
const emptyStateClearSearch = document.getElementById("empty-state-clear-search");
let recipesSectionTitle = document.getElementById("recipes-section-title");
const indexAddRecipeButton = document.getElementById("index-add-recipe-button");
const searchResultsClearSearchButton = document.getElementById("search-results-clear-search");



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
                            indexEmptyState.style.display = "";
                            indexEmptyStateTitle.textContent = UI.library.nothingFoundTitle;
                            indexEmptyStateMessage.textContent = UI.library.nothingFoundMessage;
                            emptyStateClearSearch.style.display = "";
                            emptyStateClearSearch.classList.add("button");
                            emptyStateClearSearch.classList.add("button--primary");
                            indexAddRecipeButton.classList.add("button--secondary");
                            indexAddRecipeButton.classList.remove("button--primary");
                            searchResultsClearSearchButton.style.display = "";
                        }
                        else 
                        {
                                recipesSection.style.display = "none";
                                indexEmptyState.style.display = "";
                                indexEmptyStateTitle.textContent = UI.library.emptyTitle;
                                indexEmptyStateMessage.textContent = UI.library.emptyMessage;
                                emptyStateClearSearch.style.display = "none";
                                indexAddRecipeButton.classList.add("button--primary");
                                indexAddRecipeButton.classList.remove("button--secondary");
                        }
                        return;
                }
             else 
                {
                    indexEmptyState.style.display = "none";
                    indexAddRecipeButton.classList.add("button--primary");
                                indexAddRecipeButton.classList.remove("button--secondary");
                    if (isFiltered){
                        searchResultsClearSearchButton.style.display="";
                        if (recipeArray.length === 1)
                        {
                            
                            recipesSectionTitle.textContent = UI.library.oneRecipeFoundMessage;
                            
                        }
                    else
                        {
                            /*recipesSectionTitle.textContent = recipeArray.length + " recipes found matching the search for " + searchText ;*/
                            recipesSectionTitle.textContent = UI.index.searchResults
      .replace("{count}", recipeArray.length)
      .replace("{query}", searchText);
                        }

                    }
                    else {
                        recipesSectionTitle.textContent = UI.index.recipesSectionTitle;
                        searchResultsClearSearchButton.style.display = "none";
                    }
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
                        const deleteButton = document.createElement ("button");
                        deleteButton.textContent = UI.common.delete;
                        deleteButton.classList.add("button");
                        deleteButton.classList.add("button--secondary");
                        deleteButton.classList.add("button--danger");
                        deleteButton.addEventListener("click", function(){
                            const userConfirmed = confirm (UI.common.confirmDelete);
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
                      
                       
                        wrapperRecipeActions.appendChild(editButton);
                        wrapperRecipeActions.appendChild(deleteButton);
                        wrapperRecipeCard.appendChild(wrapperRecipeActions);
                        recipesContainer.appendChild(wrapperRecipeCard);        
                    }
                }
        }

    }


displayRecipes({recipes:recipes, isFiltered: false, searchText: ""});

applyNavStrings();