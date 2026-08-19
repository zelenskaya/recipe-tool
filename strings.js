const UI = {
    common: {
        add:"Add",
        delete: "Delete",
        edit: "Edit",
        save: "Save",
        back: "Back",
        search: "Search",
        clearSearch: "Clear search",
        addRecipe: "Add recipe",
        editRecipe: "Edit recipe",
    
        confirmDelete: "Are you sure you want to delete this recipe?",
        confirmLeave: "Leave without saving?"
    },

    library: {
        emptyTitle: "No recipes yet",
        emptyMessage: "Start building your cookbook",
        nothingFoundTitle: "No recipes found",
        nothingFoundMessage: "Please try a different search",
        oneRecipeFoundMessage: "One recipe found"

    },

    index: {
        metaTitle: "Maya Approves recipe tool",
        title: "What should we cook?",
        recipesSectionTitle: "Recipes",
        searchResults: "{count} recipes found for \"{query}\""
        
    },



    recipe:{
        metaTitle:"Maya Approves recipe tool · Recipe details",
        method: "Method",
        title: "Title",
        ingredients: "Ingredients",
        description: "Recipe description",
        descriptionPlaceholder: "Enter recipe...",
        category: "Category",
        selectCategory: "Select category"

    },

    categories: {
        breakfast:"Breakfast", vegetables: "Vegetables", soups: "Soups", snacks: "Snacks", meat: "Meat"
    },
   
    addRecipe: {
        metaTitleAdd: "Maya Approves recipe tool · Add recipe",
        metaTitleEdit: "Maya Approves recipe tool · Edit recipe",
        selectCategory: "Select category"
    },

    validationRules: {
        title: "Please name your recipe",
        category: "Please select a category for your recipe"

    },
    
    fridge: {
        metaTitle: "Maya Approves recipe tool: fridge mode",
        findRecipes:"Find recipes", topMatches:
        "Top matches",
        partialMatches: "Partial matches",
        noIngredientsTitle: "No ingredients added yet",
        noIngredientsMessage: "Enter some ingredients to find recipes",
        
        pageTitle:"Get a recipe based on what's in your fridge",
       
        missingCardPrefix: "Missing: ",
        ingredientLabel: "Ingredients",
        
        quickPicks: ["Eggs", "Milk", "Banana", "Oat", "Chicken", "Beef"]
    }
};

console.log(UI);