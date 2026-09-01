const UI = {
    common: {
        add:"Add",
        delete: "Delete",
        edit: "Edit",
        save: "Save",
        back: "Back",
        search: "Search",
        clearSearch: "Clear",
        addRecipe: "Add recipe",
        editRecipe: "Edit recipe",
    
        confirmDelete: "Are you sure you want to delete this recipe?",
        confirmLeave: "Leave without saving?"
       
    },

    library: {
        emptyTitle: "No recipes yet",
        emptyMessage: "Start building your cookbook",
        nothingFoundTitle: "No recipes found",
        nothingFoundMessage: "Please try a different search or browse recipes below.",
        oneRecipeFoundMessage: "One recipe found"

    },

    index: {
        metaTitle: "Recipe tool",
        title: "What should we cook?",
        recipesSectionTitle: "Recipes",
        searchResults: "{count} recipes found for \"{query}\"",
        indexFridgeLink: "Find recipes based on what's in your fridge.",
        fridgeButton: "Fridge mode"
        
        
    },



    recipe:{
        metaTitle:"Recipe tool · Recipe details",
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
        metaTitleAdd: "Recipe tool · Add recipe",
        metaTitleEdit: "Recipe tool · Edit recipe",
        selectCategory: "Select category"
    },

    validationRules: {
        title: "Please name your recipe",
        category: "Please select a category for your recipe"

    },
    
    fridge: {
        metaTitle: "Recipe tool",
        findRecipes:"Find recipes", topMatches:
        "Top matches",
        partialMatches: "Partial matches",
        noIngredientsTitle: "No ingredients added yet",
        noIngredientsMessage: "Enter some ingredients to find recipes or browse recipes below.",
        
        pageTitle:"Get a recipe based on what's in your fridge",
       
        missingCardPrefix: "Missing",
        ingredientLabel: "What's in your fridge:",
        
        quickPicks: ["Eggs", "Milk", "Banana", "Oat", "Chicken", "Beef"]
    },

    search: {
        metaTitle: "Search results",
        pageTitle: "{count} recipes found for \"{query}\"",
        promptState: "Type something to search",
        nothingFoundTitle: "No recipes found for \"{query}\"",
        nothingFoundMessage: "Please try a different search."
    }
};
