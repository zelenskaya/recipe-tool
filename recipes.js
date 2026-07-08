let recipes = [];
const recipesContainer = document.getElementById("recipe-list");
const storedRecipes = localStorage.getItem("recipesKey");

function leafMaker(text,className){
    const leaf=document.createElement("div");
    leaf.textContent=text;
    leaf.classList.add(className);
    return(leaf);
}



function displayRecipes(recipeArray){
    recipesContainer.textContent="";
    let recipeIndex = 0;
    for (const recipeCount of recipeArray){
        const wrapper=document.createElement("div");
        const link=document.createElement("a");
        
        wrapper.classList.add("recipe-card");
        wrapper.appendChild(leafMaker(recipeCount.title,"recipe-title"));
        wrapper.appendChild(leafMaker(recipeCount.description,"recipe-description"));
        const categoryLeaf = leafMaker(recipeCount.category, "recipe-category");
        categoryLeaf.classList.add(`category-${recipeCount.category.toLowerCase()}`)
        link.href=`recipe.html?i=${recipeIndex}`;
        link.appendChild(wrapper);
        wrapper.appendChild(categoryLeaf);
        
        recipesContainer.appendChild(link);
        recipeIndex = recipeIndex +1;
    }

}


if (storedRecipes) {
    recipes = JSON.parse(storedRecipes)
    if (recipesContainer){displayRecipes(recipes);}
}