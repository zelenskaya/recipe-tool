// Seed recipes for the Lifeway demo branch.
// Real Lifeway recipes (from lifewaykefir.com/recipes), entered in the app's recipe shape.
// Ingredients are kept as clean single tokens so the fridge matcher scores them correctly.
// Category values are the app's stable keys (breakfast/vegetables/soups/snacks/meat) — never translated.
// NOTE: ids are placeholders — regenerate with crypto.randomUUID() if you prefer, but stable ids are fine for a seed.

const seedRecipes = [
    {
        title: "Strawberry Mango Kefir Smoothie",
        description: "A gorgeous layered smoothie starring Lifeway Lowfat Strawberry Kefir for protein and live probiotics, with mango, pineapple, and banana for a sweet, tropical flavor. Blend the kefir with the fruit until smooth, then layer in a glass and serve chilled.",
        category: "breakfast",
        id: "lw-0001-strawberry-mango-smoothie",
        ingredients: ["strawberry kefir", "mango", "pineapple", "banana"]
    },
    {
        title: "Blackberry Peach Kefir Bowl",
        description: "A thick, spoonable smoothie bowl built on creamy Lifeway Kefir and topped with fresh fruit and granola. Blend the kefir with blackberries and peach until thick, pour into a bowl, and finish with granola and extra berries.",
        category: "breakfast",
        id: "lw-0002-blackberry-peach-bowl",
        ingredients: ["kefir", "blackberries", "peach", "granola", "honey"]
    },
    {
        title: "Green Egg Scramble over Farmer Cheese",
        description: "A protein-rich savory breakfast: soft-scrambled eggs with spinach served over a bed of Lifeway Farmer Cheese. Whisk the eggs, fold in spinach as they set, and spoon over farmer cheese with a pinch of salt and pepper.",
        category: "breakfast",
        id: "lw-0003-green-egg-scramble",
        ingredients: ["eggs", "spinach", "farmer cheese", "butter", "salt", "pepper"]
    },
    {
        title: "Kefir Avocado Ranch Dip",
        description: "A richer, gut-friendly spin on ranch with a probiotic base from Lifeway Organic Whole Milk Plain Kefir. Blend ripe avocado with plain kefir, garlic, dill, and lemon juice until smooth, then chill before serving with vegetables.",
        category: "snacks",
        id: "lw-0004-avocado-ranch-dip",
        ingredients: ["plain kefir", "avocado", "garlic", "dill", "lemon juice", "salt"]
    },
    {
        title: "Whipped Farmer Cheese with Roasted Cherry Tomatoes",
        description: "Airy whipped Lifeway Farmer Cheese under warm, blistered cherry tomatoes and olive oil — a simple savory plate for toast or crackers. Whip the farmer cheese until light, roast the tomatoes with olive oil and garlic, and spoon over the top.",
        category: "vegetables",
        id: "lw-0005-whipped-farmer-cheese-tomatoes",
        ingredients: ["farmer cheese", "cherry tomatoes", "olive oil", "garlic", "basil", "salt"]
    },
    {
        title: "Farmer Cheese Pierogi with Sautéed Onions",
        description: "Tender dumplings filled with Lifeway Farmer Cheese and finished with butter-sautéed onions — a nod to the brand's Ukrainian roots. Make a simple dough, fill with seasoned farmer cheese, boil until they float, then pan-fry with onions in butter.",
        category: "meat",
        id: "lw-0006-farmer-cheese-pierogi",
        ingredients: ["farmer cheese", "flour", "eggs", "onion", "butter", "salt"]
    }
];