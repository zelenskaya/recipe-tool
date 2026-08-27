let selectedIngredients = [];
const units = ["ml", "g", "kg", "tbsp", "tsp", "cup"];
const fridgeSelectedIngredients = document.getElementById("fridge-selected-ingredients");
const fridgeIngredientInput = document.getElementById("fridge-ingredient-input");
const fridgeFindRecipes = document.getElementById("fridge-find-recipes");
const topMatchesList = document.getElementById("top-matches-list");
const partialMatchesList = document.getElementById("partial-matches-list");
const fridgeEmptyState = document.getElementById("fridge-empty-state");
const topMatchesSection = document.getElementById("top-matches-section");
const partialMatchesSection = document.getElementById("partial-matches-section");
const fridgeEmptyStateTitle = document.getElementById("fridge-empty-state-title");
const fridgeEmptyStateMessage = document.getElementById("fridge-empty-state-message");
const fridgePageTitle = document.getElementById("fridge-page-title");
const topMatchesHeading = document.getElementById("top-matches-heading");
const partialMatchesHeading = document.getElementById("partial-matches-heading");
const fridgeIngredientButtons = document.getElementById("fridge-ingredient-buttons");
const fridgeIngredientLabel = document.getElementById("fridge-ingredient-label");
const fridgeAddIngredient = document.getElementById("fridge-add-ingredient");
const fridgeSearchResultsClearSearch = document.getElementById("fridge-search-results-clear-search");
fridgeSearchResultsClearSearch.addEventListener("click", fridgeClearSearch);
const fridgeIngredientInputFormField = document.getElementById("fridge-ingredient-input-form-field");



function applyFridgeStrings(){
    document.title = UI.fridge.metaTitle;
    /*fridgePageTitle.textContent = UI.fridge.pageTitle;*/
    fridgeFindRecipes.textContent = UI.fridge.findRecipes;
    topMatchesHeading.textContent = UI.fridge.topMatches;
    partialMatchesHeading.textContent = UI.fridge.partialMatches;
    fridgeIngredientLabel.textContent = UI.fridge.ingredientLabel;
    fridgeAddIngredient.textContent = UI.common.add;
    fridgeSearchResultsClearSearch.textContent = UI.common.clearSearch;
}

function fridgeClearSearch (){
    selectedIngredients.length = 0;
    renderSelectedChips();
    handleFindRecipes();
}

for (const pick of UI.fridge.quickPicks) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.classList.add("chip");
    chip.textContent = pick;
    chip.addEventListener("click", handleQuickPickSelection);
    fridgeIngredientButtons.appendChild(chip);
}

fridgeIngredientInput.addEventListener("keydown", handleKeyDownFridgeMode);
fridgeAddIngredient.addEventListener("click", handleAddIngredientFridgeMode);

function handleKeyDownFridgeMode(event){
    if(event.key === "Enter"){
                event.preventDefault();
                handleAddIngredientFridgeMode();
            }
}

function handleAddIngredientFridgeMode(event){
    
    if (fridgeIngredientInput.value.trim()!==""){
        const ingredientName = fridgeIngredientInput.value.trim().toLowerCase();
        selectedIngredients.push(ingredientName);
        fridgeIngredientInput.value="";
        renderSelectedChips();
    
}
}

function handleQuickPickSelection(event){
    const ingredientName = event.target.textContent.trim().toLowerCase();
    if (!selectedIngredients.includes(ingredientName)) {
        selectedIngredients.push(ingredientName);
        renderSelectedChips();
    }

}

function renderSelectedChips(){
    fridgeSelectedIngredients.textContent = "";
    for (const [index,i] of selectedIngredients.entries()){
        const ingredientChip = document.createElement("span");
        ingredientChip.classList.add("chip");
        ingredientChip.textContent = i;
        fridgeSelectedIngredients.append(ingredientChip);

        const removeIngredient = document.createElement("button");
        const removeIngredientIcon = document.createElement("i");
        removeIngredientIcon.setAttribute("data-lucide","x");
        removeIngredient.append(removeIngredientIcon);
        removeIngredient.classList.add("removeIcon");
        removeIngredient.addEventListener("click", handleRemoveIngredient);

        function handleRemoveIngredient(){
            selectedIngredients.splice(index,1);
            renderSelectedChips();
        }

        ingredientChip.append(removeIngredient);
    }
    fridgeSearchResultsClearSearch.classList.toggle("hidden", selectedIngredients.length === 0);
    lucide.createIcons();


}





fridgeFindRecipes.addEventListener("click", handleFindRecipes);

function handleFindRecipes(){
    if (recipes.length === 0) {
        fridgeIngredientInputFormField.classList.add("hidden");
        fridgeIngredientButtons.classList.add("hidden");
        fridgeFindRecipes.classList.add("hidden");
    }
    fridgeEmptyState.classList.add("hidden");
    topMatchesSection.classList.add("hidden");
    partialMatchesSection.classList.add("hidden");
   
    const scoredRecipes = [];

    if (recipes.length === 0){
       
       /* fridgeEmptyState.classList.remove("hidden");
        fridgeEmptyStateTitle.textContent = UI.library.emptyTitle;
        fridgeEmptyStateMessage.textContent = UI.library.emptyMessage;*/
        return;

    }
    else {
         if (selectedIngredients.length === 0)
            {
                
                fridgeEmptyState.classList.remove("hidden");
                fridgeEmptyStateTitle.textContent = UI.fridge.noIngredientsTitle;
                fridgeEmptyStateMessage.textContent = UI.fridge.noIngredientsMessage;
                recipesSection.classList.remove("hidden");
                return;

        }

        else {
            for (const re of recipes)
                    {
                        scoredRecipes.push({recipe:re, score:scoreRecipe(selectedIngredients, re)});
                    }
                }
        }

    const topMatchingRecipes = [];
    const partialMatchingRecipes = [];
    const restOfRecipes = [];
    for (const re of scoredRecipes){
        if ((re.score.matched === re.score.total)&&(!re.score.unknown)){
            topMatchingRecipes.push(re);
        } else {
            if (re.score.matched > 0){
                
                partialMatchingRecipes.push(re);

            } else {
                restOfRecipes.push(re);
            }
        }

    }

 if((topMatchingRecipes.length === 0) && (partialMatchingRecipes.length === 0))
                {
                  
                    fridgeEmptyState.classList.remove("hidden");
                    fridgeEmptyStateTitle.textContent = UI.library.nothingFoundTitle;
                    fridgeEmptyStateMessage.textContent = UI.library.nothingFoundMessage;
                    recipesSection.classList.remove("hidden");
                    return;
                }
                

    partialMatchingRecipes.sort((a,b) => {
        return (b.score.matched / b.score.total) - (a.score.matched / a.score.total);

    });

    if (topMatchingRecipes.length > 0){
       
        recipesSection.classList.add("hidden");
        topMatchesSection.classList.remove("hidden");
        topMatchesList.textContent = "";

        for (const topRecipe of topMatchingRecipes){
            const card = makeRecipeCard(topRecipe.recipe);
            topMatchesList.appendChild(card);     
        }

    }

    

    if (partialMatchingRecipes.length > 0){
        recipesSection.classList.add("hidden");
        partialMatchesSection.classList.remove("hidden");
       
        partialMatchesList.textContent = "";
        for (const partialRecipe of partialMatchingRecipes){
            const card = makeRecipeCard(partialRecipe.recipe);
        
        const missingIngredients = document.createElement("div");

        missingIngredients.textContent = UI.fridge.missingCardPrefix + partialRecipe.score.missing.join(", ");
        card.appendChild(missingIngredients);
        partialMatchesList.appendChild(card);
    }
    }
    

    

}

function normalize(ingredientName){
    const ingredientCore = [];
    const lowerCaseIngredient = ingredientName.toLowerCase();
    const ingredientWords = lowerCaseIngredient.split(" ");

    for (const word of ingredientWords){
        if((Number.isNaN(Number(word)))&&(!units.includes(word))){ingredientCore.push(word)}
    }
    
    return(ingredientCore);
}


function scoreRecipe(fridgeIngredients, recipe) {
    if (!recipe.ingredients || recipe.ingredients.length === 0) {
        return {matched: 0, total: 0, missing: [], unknown: true};
    }
    else {
        let missingIngredients = [];
        let matchedIngredients = 0;
        

        for (const ingredient of recipe.ingredients) {

            const normalizedIngredient = normalize(ingredient);
           
            if (normalizedIngredient.some(word => fridgeIngredients.includes(word))){
                matchedIngredients = matchedIngredients + 1;
           
            }
            else{
                missingIngredients.push(ingredient);
            }

           
        }

        return {matched: matchedIngredients, total: recipe.ingredients.length, missing: missingIngredients, unknown: false};

    }
}

applyFridgeStrings();

handleFindRecipes();