// Seed recipes for Maya Approves? — toddler-friendly breakfast, snack, and vegetable recipes.
// Ingredients are kept as clean single tokens so the fridge matcher scores them correctly.
// Category values are the app's stable keys (breakfast/vegetables/soups/snacks/meat) — never translated.
// ids are stable placeholder slugs; regenerate with crypto.randomUUID() if you prefer.
/*const seedRecipes = [];*/

const seedRecipes = [
    // ——— BREAKFAST ———
   
    {
        title: "Banana Apple Pancakes",
        description: "The most forgiving pancake in the set — banana holds everything together. Mash the banana, add the egg, flour, and a pinch of baking powder, rest five minutes, then fold in grated apple. Cook on low heat in a dry pan until golden on both sides.",
        category: "breakfast",
        id: "seed-0002-banana-apple-pancakes",
        ingredients: ["one banana", "1-2 tbsp flour", "1 egg", "0.5 tbsp baking powder"]
    },
    
    {
        title: "Egg Crepe",
        description: "A thin, egg-heavy crepe that comes together in one bowl. Whisk the egg with milk and flour until smooth, pour onto a hot lightly oiled pan, and cook like a thin crepe, flipping when the edges dry out. Fill with peanut butter and banana to roll up.",
        category: "breakfast",
        id: "seed-0007-egg-crepe",
        ingredients: ["one egg", "¼ glass milk", "2 tbsp flour"]
    }
    
  
];
