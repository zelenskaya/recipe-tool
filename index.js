let filteredRecipes = [];

const clearSearchButton = document.getElementById("empty-state-clear-search");
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", handleSearch);
const resultsClearSearchButton = document.getElementById("search-results-clear-search");
resultsClearSearchButton.addEventListener("click", clearSearch);



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

clearSearchButton.addEventListener("click", clearSearch);
function clearSearch(){
    searchInput.value = "";
    filterAndDisplay("");
}