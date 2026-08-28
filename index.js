let filteredRecipes = [];




const indexSearchLabel = document.getElementById("index-search-label");
const indexPageTitle = document.getElementById("index-page-title");




function applyIndexStrings() {
    document.title = UI.index.metaTitle;
    
    indexPageTitle.textContent = UI.index.title;
    recipesSectionTitle.textContent = UI.index.recipesSectionTitle;
    
    
    
    indexAddRecipeButton.textContent = UI.common.addRecipe;

}







applyIndexStrings();