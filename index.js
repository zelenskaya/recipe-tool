let filteredRecipes = [];
const indexFridgeLink = document.getElementById("index-fridge-link");

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", handleSearch);
const indexSearchLabel = document.getElementById("index-search-label");
const indexPageTitle = document.getElementById("index-page-title");
searchResultsClearSearchButton.addEventListener("click",clearSearch);
const indexFridgeLinkButton = document.getElementById("index-fridge-link-button");


function applyIndexStrings() {
    document.title = UI.index.metaTitle;
    indexSearchLabel.textContent = UI.common.search;
    indexPageTitle.textContent = UI.index.title;
    recipesSectionTitle.textContent = UI.index.recipesSectionTitle;
    indexFridgeLink.textContent = UI.index.indexFridgeLink;
    
    searchResultsClearSearchButton.textContent = UI.common.clearSearch;
    indexAddRecipeButton.textContent = UI.common.addRecipe;
    indexFridgeLinkButton.textContent = UI.index.fridgeButton;



}

function handleSearch(event) {
    const userTypedText = event.target.value;
    filterAndDisplay(userTypedText);
}

function filterAndDisplay(searchText){
    filteredRecipes = [];
    
    for (const recipeItem of recipes) {
        const recipeTitleToLowerCase = recipeItem.title.toLowerCase();
        const searchTextToLowerCase = searchText.toLowerCase();

        if (recipeTitleToLowerCase.includes(searchTextToLowerCase)) filteredRecipes.push(recipeItem);
        
    }
    
    
   
    
    const isFiltered = searchText !== "";
    displayRecipes({recipes:filteredRecipes, isFiltered, searchText});
   
}

emptyStateClearSearch.addEventListener("click", clearSearch);
function clearSearch(){
    searchInput.value = "";
    filterAndDisplay("");
}

applyIndexStrings();