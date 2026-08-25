
// Seed recipes for Maya Approves? — generic demo data for main.
// Ingredients are kept as clean single tokens so the fridge matcher scores them correctly.
// Category values are the app's stable keys (breakfast/vegetables/soups/snacks/meat) — never translated.
// ids are stable placeholder slugs; regenerate with crypto.randomUUID() if you prefer.

const seedRecipes = [
    {
        title: "Banana Oat Pancakes",
        description: "Soft, naturally sweet pancakes that hold together well for little hands. Mash the banana, whisk in eggs, oats, and a splash of milk, then cook small rounds on low heat until set and golden.",
        category: "breakfast",
        id: "seed-0001-banana-oat-pancakes",
        ingredients: ["banana", "oats", "eggs", "milk", "cinnamon"]
    },
    {
        title: "Scrambled Eggs with Spinach",
        description: "A quick protein-rich breakfast. Whisk the eggs, wilt a little chopped spinach in butter, then fold the eggs through and cook slowly until soft and creamy. Season lightly.",
        category: "breakfast",
        id: "seed-0002-eggs-spinach",
        ingredients: ["eggs", "spinach", "butter", "salt"]
    },
    {
        title: "Carrot Apple Muffins",
        description: "Moist little muffins with grated carrot and apple for natural sweetness. Mix the dry and wet ingredients separately, combine, spoon into a muffin tin, and bake until a skewer comes out clean.",
        category: "snacks",
        id: "seed-0003-carrot-apple-muffins",
        ingredients: ["carrot", "apple", "flour", "eggs", "oil", "cinnamon"]
    },
    {
        title: "Roasted Sweet Potato Wedges",
        description: "Sweet, tender wedges that make an easy finger food. Cut sweet potato into strips, toss with olive oil and a little paprika, and roast until soft inside and lightly crisp at the edges.",
        category: "vegetables",
        id: "seed-0004-sweet-potato-wedges",
        ingredients: ["sweet potato", "olive oil", "salt", "paprika"]
    },
    {
        title: "Chicken and Rice Soup",
        description: "A gentle, comforting soup. Simmer chicken with diced carrot, celery, and onion, add rice, and cook until everything is soft and the broth is flavorful. Shred the chicken before serving.",
        category: "soups",
        id: "seed-0005-chicken-rice-soup",
        ingredients: ["chicken", "rice", "carrot", "celery", "onion", "salt"]
    },
    {
        title: "Mini Turkey Meatballs",
        description: "Small, soft meatballs sized for toddlers. Mix ground turkey with breadcrumbs, egg, garlic, and parsley, roll into small balls, and bake or gently pan-cook until cooked through.",
        category: "meat",
        id: "seed-0006-turkey-meatballs",
        ingredients: ["ground turkey", "breadcrumbs", "eggs", "garlic", "parsley", "salt"]
    }
];