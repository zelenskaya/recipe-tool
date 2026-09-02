const searchPageTitle=document.getElementById("search-page-title");
const query = new URLSearchParams(location.search).get('q');
const searchResultsContainer = document.getElementById("search-results-container");
let searchResults = [];

function runSearch(){
    if (!query || query.trim() === ""){
    searchPageTitle.textContent = UI.search.promptState;
    return;
   
}

for (const recipeItem of recipes) {
    const blob = [recipeItem.title, recipeItem.description, ...recipeItem.ingredients].join(" ").toLowerCase();
    if(blob.includes(query.toLowerCase())){
        searchResults.push(recipeItem);
    }
}

if(searchResults.length === 0){
    searchPageTitle.textContent = UI.search.nothingFoundTitle .replace("{query}", query);
    searchResultsContainer.textContent = UI.search.nothingFoundMessage;
    return;
    

} else {
    searchPageTitle.textContent = UI.search.pageTitle
    .replace("{count}", searchResults.length)
    .replace("{query}", query);

    searchResultsContainer.textContent = "";
   
    for (const recipeItem of searchResults){
        const resultCard = makeRecipeCard(recipeItem);
        searchResultsContainer.classList.add("recipe-list");
        searchResultsContainer.append(resultCard);
    }
}
}
function applySearchStrings(){
    document.title = UI.search.metaTitle;
    
    
}

runSearch();

applySearchStrings();