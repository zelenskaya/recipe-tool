let filteredRecipes = [];




const indexSearchLabel = document.getElementById("index-search-label");
const indexPageTitle = document.getElementById("index-page-title");
searchResultsClearSearchButton.addEventListener("click",clearSearch);



function applyIndexStrings() {
    document.title = UI.index.metaTitle;
    
    indexPageTitle.textContent = UI.index.title;
    recipesSectionTitle.textContent = UI.index.recipesSectionTitle;
    
    
    searchResultsClearSearchButton.textContent = UI.common.clearSearch;
    indexAddRecipeButton.textContent = UI.common.addRecipe;

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