let selectedIngredients = [];
const units = ["ml", "g", "kg", "tbsp", "tsp", "cup"];
const quickPickButtons = document.querySelectorAll("#ingredient-buttons button");
const selectedIngredientsContainer = document.getElementById("selected-ingredients-fridge-mode");
const ingredientItemFridgeMode = document.getElementById("ingredient-item-fridge-mode");
const findRecipesButton = document.getElementById("find-recipes-fridge-mode");
const topScoredRecipesContainer = document.getElementById("top-scored-recipes");
const partialMatchesRecipesContainer = document.getElementById("partial-matches-recipes");
const emptyStateFridge = document.getElementById("empty-state-fridge");
const topScoredRecipesSection = document.getElementById("top-scored-recipes-section");
const partialMatchesRecipesSection = document.getElementById("partial-matches-recipes-section");
const emptyStateTitleFridge = document.getElementById("empty-state-title-fridge");
const emptyStateMessageFridge = document.getElementById("empty-state-message-fridge");



ingredientItemFridgeMode.addEventListener("keydown", handleKeyDownFridgeMode);

function handleKeyDownFridgeMode(){
    if(event.key === "Enter"){
                event.preventDefault();
                handleAddIngredientFridgeMode();
            }
}

function handleAddIngredientFridgeMode(event){
    
    if (ingredientItemFridgeMode.value.trim()!==""){
        selectedIngredients.push(ingredientItemFridgeMode.value);
        ingredientItemFridgeMode.value="";
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
    selectedIngredientsContainer.textContent = "";
    for (const i of selectedIngredients){
        const ingredientChip = document.createElement("span");
        ingredientChip.classList.add("chip");
        ingredientChip.textContent = i;
        selectedIngredientsContainer.append(ingredientChip);

        const removeIngredient = document.createElement("button");
        const removeIngredientIcon = document.createElement("i");
        removeIngredientIcon.setAttribute("data-lucide","x");
        removeIngredient.append(removeIngredientIcon);
        removeIngredient.addEventListener("click", handleRemoveIngredient);

        function handleRemoveIngredient(){
            const position = selectedIngredients.indexOf(i);
            selectedIngredients.splice(position,1);
            renderSelectedChips();
        }

        ingredientChip.append(removeIngredient);
    }
    lucide.createIcons();


}



for (const q of quickPickButtons){
    q.addEventListener("click", handleQuickPickSelection);
    
}

findRecipesButton.addEventListener("click", handleFindRecipes);

function handleFindRecipes(){

    emptyStateFridge.classList.add("hidden");
    topScoredRecipesSection.classList.add("hidden");
    partialMatchesRecipesSection.classList.add("hidden");
   
    const scoredRecipes = [];

    if (recipes.length === 0){
       
        emptyStateFridge.classList.remove("hidden");
        emptyStateTitleFridge.textContent = "No recipes yet";
        emptyStateMessageFridge.textContent = "Start building your cookbook";
        return;

    }
    else {
         if (selectedIngredients.length === 0)
            {
                
                emptyStateFridge.classList.remove("hidden");
                emptyStateTitleFridge.textContent = "No ingredients added yet";
                emptyStateMessageFridge.textContent = "Enter some ingredients to find recipes";
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
                  
                    emptyStateFridge.classList.remove("hidden");
                    emptyStateTitleFridge.textContent = "No recipes with these ingredients found";
                    emptyStateMessageFridge.textContent = "Please try a different search";
                    return;
                }
                

    partialMatchingRecipes.sort((a,b) => {
        return (b.score.matched / b.score.total) - (a.score.matched / a.score.total);

    });

    if (topMatchingRecipes.length > 0){
       
        topScoredRecipesSection.classList.remove("hidden");
        topScoredRecipesContainer.textContent = "";

        for (const topRecipe of topMatchingRecipes){
            const wrapperRecipeCard = document.createElement("div");
            const link = document.createElement("a");
            link.classList.add("recipe-card-top-part");
            wrapperRecipeCard.classList.add("recipe-card");
            link.appendChild(leafMaker(topRecipe.recipe.title,"recipe-title"));
            link.appendChild(leafMaker(topRecipe.recipe.description,"recipe-description"));
            const categoryLeaf = leafMaker(topRecipe.recipe.category, "recipe-category");
            categoryLeaf.classList.add(`category-${topRecipe.recipe.category.toLowerCase()}`);
            link.href=`recipe.html?recipeId=${topRecipe.recipe.id}`;
            link.appendChild(categoryLeaf);
            wrapperRecipeCard.appendChild(link);
            topScoredRecipesContainer.appendChild(wrapperRecipeCard);        
        }

    }

    

    if (partialMatchingRecipes.length > 0){
        partialMatchesRecipesSection.classList.remove("hidden");
       
        partialMatchesRecipesContainer.textContent = "";
        for (const partialRecipe of partialMatchingRecipes){
        const wrapperRecipeCard = document.createElement("div");
        const link = document.createElement("a");
        link.classList.add("recipe-card-top-part");
        wrapperRecipeCard.classList.add("recipe-card");
        link.appendChild(leafMaker(partialRecipe.recipe.title,"recipe-title"));
        link.appendChild(leafMaker(partialRecipe.recipe.description,"recipe-description"));
        const categoryLeaf = leafMaker(partialRecipe.recipe.category, "recipe-category");
        categoryLeaf.classList.add(`category-${partialRecipe.recipe.category.toLowerCase()}`);
        link.href=`recipe.html?recipeId=${partialRecipe.recipe.id}`;
        link.appendChild(categoryLeaf);
        wrapperRecipeCard.appendChild(link);
        const missingIngredients = document.createElement("div");

        missingIngredients.textContent = "Missing: " + partialRecipe.score.missing.join(", ");
        wrapperRecipeCard.appendChild(missingIngredients);
        partialMatchesRecipesContainer.appendChild(wrapperRecipeCard);
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


