// Seed recipes for Maya Approves? — toddler-friendly breakfast, snack, and vegetable recipes.
// Ingredients are kept as clean single tokens so the fridge matcher scores them correctly.
// Category values are the app's stable keys (breakfast/vegetables/soups/snacks/meat) — never translated.
// ids are stable placeholder slugs; regenerate with crypto.randomUUID() if you prefer.
/*const seedRecipes = [];*/

const seedRecipes = [
    // ——— BREAKFAST ———
    {
        title: "Banana Apple Semolina Pancakes",
        description: "Soft pancakes sweetened by banana and grated apple. Mash the banana, whisk in the egg, semolina, and flour, and let the batter rest so the semolina swells. Fold in grated apple last and cook small rounds on low heat, covered, until set on both sides.",
        category: "breakfast",
        id: "seed-0001-banana-apple-semolina-pancakes",
        ingredients: ["banana", "apple", "semolina", "flour", "eggs"]
    },
    {
        title: "Banana Apple Pancakes",
        description: "The most forgiving pancake in the set — banana holds everything together. Mash the banana, add the egg, flour, and a pinch of baking powder, rest five minutes, then fold in grated apple. Cook on low heat in a dry pan until golden on both sides.",
        category: "breakfast",
        id: "seed-0002-banana-apple-pancakes",
        ingredients: ["banana", "apple", "flour", "eggs", "baking powder"]
    },
    {
        title: "Apple Pancakes",
        description: "A clean apple flavour with no banana, so the batter stays smooth and less sweet. Blend the apple with the egg, add enough flour for a thick batter, and cook on a lightly oiled pan on both sides. Squeeze the grated apple first if it is very juicy.",
        category: "breakfast",
        id: "seed-0003-apple-pancakes",
        ingredients: ["apple", "eggs", "flour", "cinnamon"]
    },
    {
        title: "Pear Pancakes",
        description: "A minimal two-ingredient batter for little hands. Blend the unpeeled pear to a puree, add the egg and blend again, then stir in flour until it holds shape but stays soft. Cook on a lightly oiled pan on both sides. Good with avocado or pomegranate on the side.",
        category: "breakfast",
        id: "seed-0004-pear-pancakes",
        ingredients: ["pear", "eggs", "flour", "cinnamon"]
    },
    {
        title: "Apple Flax Pancakes",
        description: "Pancakes with ground flax for omega-3 and digestion. Mash the banana, grate the apple, whisk with eggs, then add flour, baking powder, and ground flax. Loosen with a splash of milk to a thick batter and cook on a dry pan on both sides.",
        category: "breakfast",
        id: "seed-0005-apple-flax-pancakes",
        ingredients: ["apple", "banana", "eggs", "flour", "flax", "milk"]
    },
    {
        title: "Mini Banana Orange Pancakes",
        description: "Small fluffy pancakes sweetened with banana and orange instead of sugar. Whisk everything smooth, thinning with a little water if needed, and pour small rounds onto a hot non-stick pan. Flip once the first bubbles appear and cook the other side.",
        category: "breakfast",
        id: "seed-0006-mini-banana-orange-pancakes",
        ingredients: ["banana", "orange juice", "eggs", "flour", "baking powder", "oil"]
    },
    {
        title: "One-Minute Egg Crepe",
        description: "A thin, egg-heavy crepe that comes together in one bowl. Whisk the egg with milk and flour until smooth, pour onto a hot lightly oiled pan, and cook like a thin crepe, flipping when the edges dry out. Fill with peanut butter and banana to roll up.",
        category: "breakfast",
        id: "seed-0007-egg-crepe",
        ingredients: ["eggs", "milk", "flour", "oil"]
    },
    {
        title: "Oat Crepe with Chia and Coconut",
        description: "A filling blended crepe with chia and coconut. Blend oats, eggs, milk, chia, and desiccated coconut until smooth, then pour onto a hot pan greased with butter and cook like an omelette, flipping once the top sets. Add sesame or flax for extra iron.",
        category: "breakfast",
        id: "seed-0008-oat-crepe-chia-coconut",
        ingredients: ["oats", "eggs", "milk", "chia", "coconut", "butter"]
    },
    {
        title: "Oatmeal with Seeds and Dried Fruit",
        description: "A warm iron-forward bowl. Cook oats in milk or water, then top with pumpkin seeds, chopped apricots, and almonds and drizzle with blackstrap molasses. A little orange juice on the side helps iron absorption.",
        category: "breakfast",
        id: "seed-0009-oatmeal-seeds-dried-fruit",
        ingredients: ["oats", "milk", "pumpkin seeds", "apricots", "almonds", "molasses"]
    },
    {
        title: "Scrambled Eggs with Spinach",
        description: "A quick iron-rich breakfast. Wilt a handful of baby spinach in butter, add beaten eggs, and cook slowly until soft. Serve with cherry tomatoes and toast, and a small glass of orange juice alongside.",
        category: "breakfast",
        id: "seed-0010-eggs-spinach",
        ingredients: ["eggs", "spinach", "butter", "tomato", "bread"]
    },
    {
        title: "Tahini Banana Toast",
        description: "An open toast built on iron-rich tahini. Toast wholegrain bread, spread tahini generously, top with sliced banana and hemp seeds, and finish with a drizzle of honey.",
        category: "breakfast",
        id: "seed-0011-tahini-banana-toast",
        ingredients: ["bread", "tahini", "banana", "hemp seeds", "honey"]
    },
    {
        title: "Corn and Banana Bake",
        description: "A three-ingredient baked cup. Blend the egg and banana smooth, stir in polenta, and rest fifteen minutes so it absorbs. Pour into silicone moulds and bake at 180C for 20-30 minutes. The riper the banana, the sweeter it bakes.",
        category: "breakfast",
        id: "seed-0012-corn-banana-bake",
        ingredients: ["eggs", "polenta", "banana"]
    },
    {
        title: "Couscous Pizza",
        description: "A savoury base made from leftover couscous. Beat eggs with the couscous, cook covered on a pan until the bottom sets, then flip, spread with sour cream, top with sliced tomato and cheese, and cook until melted. The filling and grain are flexible.",
        category: "breakfast",
        id: "seed-0013-couscous-pizza",
        ingredients: ["couscous", "eggs", "tomato", "cheese", "sour cream"]
    },
    {
        title: "Lazy Khachapuri Pancake",
        description: "A cheesy torn-lavash pancake cooked like an omelette. Whisk egg, cottage cheese, hard cheese, and a splash of milk, tear in small pieces of lavash, and let it soak a few minutes. Cook covered on a lightly oiled pan on both sides.",
        category: "breakfast",
        id: "seed-0014-lazy-khachapuri",
        ingredients: ["lavash", "eggs", "cottage cheese", "cheese", "milk"]
    },
    {
        title: "Stuffed Pancakes",
        description: "Fluffy pancakes with a molten centre. Freeze rounds of filling on parchment, whisk a batter of flour, baking powder, milk, vanilla, and melted butter, then pour a little batter, set a frozen disc in the middle, cover with more batter, and cook covered until golden, flipping once.",
        category: "breakfast",
        id: "seed-0015-stuffed-pancakes",
        ingredients: ["flour", "milk", "eggs", "butter", "baking powder"]
    },
    {
        title: "Overnight Chia Pudding",
        description: "A make-ahead pudding with zero morning effort. Stir chia, milk, and vanilla the night before and refrigerate. In the morning top with mixed berries and granola.",
        category: "breakfast",
        id: "seed-0016-chia-pudding",
        ingredients: ["chia", "milk", "vanilla", "berries", "granola"]
    },

    // ——— SNACKS ———
    {
        title: "Carrot Cookies with Nut Butter",
        description: "Soft carrot cookies bound with nut butter. Mix carrot puree, egg, nut butter, wholegrain flour, spices, and raisins, then add baking soda topped with lemon juice to activate it in the dough. The dough is sticky — shape with wet hands and flatten on parchment, or add more flour to roll and cut. Bake at 180C.",
        category: "snacks",
        id: "seed-0017-carrot-nut-butter-cookies",
        ingredients: ["carrot", "eggs", "nut butter", "flour", "raisins", "cinnamon"]
    },
    {
        title: "Oatmeal Cookies with Walnuts and Raisins",
        description: "Chunky oat cookies with banana for sweetness. Cream butter with mashed banana, add beaten egg, then flour and baking powder, then oats, chopped walnuts, and finely chopped raisins. Shape balls a little larger than a walnut, flatten, and bake at 180C for 15-20 minutes.",
        category: "snacks",
        id: "seed-0018-oatmeal-walnut-raisin-cookies",
        ingredients: ["oats", "banana", "eggs", "flour", "walnuts", "raisins", "butter"]
    },
    {
        title: "Basic Cookie Dough",
        description: "A flexible base cookie that changes with what you add. Beat egg with butter and baking powder, fold in one add-in (apple, banana, pumpkin, berries, nuts, or cheese), then add flour to suit — more for wet add-ins, less for dry. Shape, flatten, and bake at 180C, 20 minutes for dry mixes and 25-30 for fruit.",
        category: "snacks",
        id: "seed-0019-basic-cookie-dough",
        ingredients: ["eggs", "flour", "butter", "baking powder", "apple"]
    },
    {
        title: "Oat Cookies with Peanut Butter and Apricots",
        description: "Egg-free cookies held together by peanut butter. Soak apricots, grind oats to a coarse flour, and blend banana with the apricots, then blend in the peanut butter. Combine with the dry mix, shape flat rounds, and bake at 180C for 15 minutes; cool before lifting.",
        category: "snacks",
        id: "seed-0020-peanut-butter-apricot-cookies",
        ingredients: ["oats", "peanut butter", "banana", "apricots", "flax", "baking powder"]
    },
    {
        title: "Pumpkin Cookies with Dried Fruit",
        description: "Soft, fragrant cookies rich in dried fruit. Cream butter with grated raw pumpkin, then mix in flour, baking powder, and warm spices with a soaked, chopped mix of raisins, figs, apricots, and cranberries. Shape walnut-sized balls, flatten, and bake at 180C for 20-25 minutes.",
        category: "snacks",
        id: "seed-0021-pumpkin-dried-fruit-cookies",
        ingredients: ["pumpkin", "flour", "butter", "raisins", "apricots", "cranberries", "baking powder"]
    },
    {
        title: "Almond Flour Banana Cookies",
        description: "Three-ingredient cookies with a crisp coating. Blend egg and banana, stir in almond flour, roll into walnut-sized balls, and coat generously in rice flour. Space them on parchment and bake at 180C for 15-18 minutes until risen and cracked.",
        category: "snacks",
        id: "seed-0022-almond-banana-cookies",
        ingredients: ["almond flour", "eggs", "banana", "rice flour"]
    },
    {
        title: "Carrot Raisin Cookies",
        description: "Simple naturally sweet cookies. Mix butter, egg, grated carrot, flour, baking powder, and soaked raisins into a soft dough, shape walnut-sized balls, and flatten slightly. Bake at 180C for 15 minutes. A pinch of turmeric adds colour.",
        category: "snacks",
        id: "seed-0023-carrot-raisin-cookies",
        ingredients: ["carrot", "flour", "raisins", "eggs", "butter", "baking powder"]
    },
    {
        title: "Spiced Oat Cookies",
        description: "Spiced cookies leavened with soda and boiling water. Beat butter with spices and salt, add dried-fruit puree, then add soda dissolved in boiling water alternately with oat and wheat flour. Shape thick rounds and bake at 180C for about 15 minutes.",
        category: "snacks",
        id: "seed-0024-spiced-oat-cookies",
        ingredients: ["oat flour", "flour", "dried fruit", "butter", "cinnamon", "baking soda"]
    },
    {
        title: "Pumpkin Spice Cookies",
        description: "Thin-crusted spiced pumpkin cookies. Toast and grind oats, soak and chop apricots and raisins, then mix everything except the flour and add flour gradually to a soft, non-sticky dough. Spoon into balls and bake at 180C for 20 minutes; store in a bag so they stay soft.",
        category: "snacks",
        id: "seed-0025-pumpkin-spice-cookies",
        ingredients: ["pumpkin", "oats", "apricots", "raisins", "flour", "oil"]
    },
    {
        title: "Kiwi Donuts",
        description: "Baked donuts with mashed kiwi through the batter. Mix flour and baking powder, whisk in greek yogurt, coconut oil, and egg, then fold in peeled mashed kiwi. Pipe into a silicone donut mould and bake at 180C for 15-18 minutes.",
        category: "snacks",
        id: "seed-0026-kiwi-donuts",
        ingredients: ["kiwi", "flour", "greek yogurt", "coconut oil", "eggs", "baking powder"]
    },
    {
        title: "Quick Oat Muffins",
        description: "Tiny muffins that need no mixer. Mash the banana, beat with the egg and a spoon of yogurt, then add baking powder, cinnamon, and fine oats to a thick batter. Spoon into silicone moulds and bake at 160C for 15-20 minutes.",
        category: "snacks",
        id: "seed-0027-quick-oat-muffins",
        ingredients: ["banana", "eggs", "oats", "yogurt", "cinnamon", "baking powder"]
    },
    {
        title: "Carrot Muffins",
        description: "Very sweet little muffins with no added sugar. Mix melted butter, egg, and grated carrot, then add flour, baking powder, and raisins. Spoon into moulds and bake at 180C for 15 minutes until soft.",
        category: "snacks",
        id: "seed-0028-carrot-muffins",
        ingredients: ["carrot", "flour", "eggs", "raisins", "butter", "baking powder"]
    },
    {
        title: "Quick Apple Muffins",
        description: "Airy apple muffins beaten by hand. Whisk eggs to a foam, mix in milk and oil, fold in sifted flour with baking powder, and stir in chopped apple last. Bake at 180C for 25 minutes.",
        category: "snacks",
        id: "seed-0029-quick-apple-muffins",
        ingredients: ["apple", "eggs", "flour", "milk", "oil", "baking powder"]
    },
    {
        title: "Carrot Apple Cherry Muffins",
        description: "Moist muffins sweetened only with banana. Grate carrot and apple, blend banana with thawed cherries, and combine with flour, a ground seed mix, oil, baking powder, and cinnamon. Bake at 190C for about 25 minutes and serve cooled.",
        category: "snacks",
        id: "seed-0030-carrot-apple-cherry-muffins",
        ingredients: ["carrot", "apple", "cherries", "banana", "flour", "seeds", "baking powder"]
    },
    {
        title: "Green Pea Biscuit Snacks",
        description: "Savoury-leaning biscuits made from green peas. Blend peas with water to a puree, mix with flour, butter, and baking powder into an elastic dough, and roll out on parchment — thinner for crisp, thicker for soft. Cut shapes and bake at 180C until done.",
        category: "snacks",
        id: "seed-0031-green-pea-biscuits",
        ingredients: ["green peas", "flour", "butter", "baking powder"]
    },
    {
        title: "Pumpkin Spice Gingerbread Cookies",
        description: "Soft spiced pumpkin gingerbread. Toast and grind oats, soak and chop apricots and raisins, mix everything except flour, and add flour gradually to a soft dough. Roll into balls, bake at 180C for 20 minutes, and store covered so a crust doesn't form.",
        category: "snacks",
        id: "seed-0032-pumpkin-gingerbread",
        ingredients: ["pumpkin", "oats", "apricots", "raisins", "flour", "oil"]
    },
    {
        title: "Cottage Cheese Peach Bake",
        description: "A blended baked cheese cup with fruit. Blend cottage cheese with the egg, stir in chopped peach and semolina, and rest 10-15 minutes. Pour into a silicone mould and bake at 180C for 40-45 minutes.",
        category: "snacks",
        id: "seed-0033-cottage-cheese-peach-bake",
        ingredients: ["cottage cheese", "eggs", "semolina", "peach"]
    },
    {
        title: "Cottage Cheese Bake Base",
        description: "A universal baked-cheese base for endless add-ins. Mix cottage cheese, a yolk, half a mashed banana, soaked raisins, and a few spoons of flour to a shapeable dough. Form with wet hands into greased moulds and bake at 180C for 20 minutes.",
        category: "snacks",
        id: "seed-0034-cottage-cheese-base",
        ingredients: ["cottage cheese", "eggs", "banana", "raisins", "flour"]
    },
    {
        title: "Curry Rice Balls",
        description: "Crisp rice balls with a molten curry centre. Dissolve Japanese curry cubes in a little boiling water and mix through cooked rice, shape the rice around mozzarella into balls, then air-fry or bake at 200C, brushing with oil and sesame partway, until golden.",
        category: "snacks",
        id: "seed-0035-curry-rice-balls",
        ingredients: ["rice", "curry", "mozzarella", "sesame", "oil"]
    },
    {
        title: "Kids' Charlotte",
        description: "A no-mixer apple sponge sweetened only by fruit. Whisk egg with vanilla, add oil and yogurt, then fold in sifted flour and baking powder to a thick batter. Pour into a lined tin, submerge chopped apple and plum across the whole surface, and bake at 180C for 30-40 minutes without opening the oven early.",
        category: "snacks",
        id: "seed-0036-kids-charlotte",
        ingredients: ["apple", "plum", "eggs", "flour", "yogurt", "oil", "baking powder"]
    },
    {
        title: "Fruit Strudel",
        description: "Stretched strudel with a poppyseed-and-fruit filling. Knead a flour, water, salt, and oil dough and rest it, stretch very thin, brush with melted butter, and scatter ground poppyseed and chopped fruit. Roll up and bake. Poppyseed stands in for breadcrumbs.",
        category: "snacks",
        id: "seed-0037-fruit-strudel",
        ingredients: ["flour", "poppyseed", "apple", "plum", "butter"]
    },

    // ——— VEGETABLES ———
    {
        title: "Zucchini Corn Fritters",
        description: "Savoury fritters with sweetcorn, cheese, and tahini. Grate and squeeze the zucchini dry, mix with egg, rice flour, corn kernels, grated mozzarella, tahini, and nutmeg, and cook on a pan greased with coconut oil on both sides.",
        category: "vegetables",
        id: "seed-0038-zucchini-corn-fritters",
        ingredients: ["zucchini", "eggs", "rice flour", "corn", "mozzarella", "tahini"]
    },
    {
        title: "Zucchini Herb Fritters",
        description: "Simple green fritters with onion and herbs. Grate and squeeze the zucchini, mix with egg, finely chopped onion, garlic, dill, and parsley, and add flour to a batter that holds. Cook on a pan on both sides.",
        category: "vegetables",
        id: "seed-0039-zucchini-herb-fritters",
        ingredients: ["zucchini", "eggs", "flour", "onion", "garlic", "dill"]
    },
    {
        title: "Carrot Zucchini Fritters",
        description: "Little fritters of carrot and zucchini. Grate both, mix with an egg, a spoon of cottage cheese, and a spoon of rice flour, and cook on a pan until set on both sides. Squeeze the vegetables well so they hold together.",
        category: "vegetables",
        id: "seed-0040-carrot-zucchini-fritters",
        ingredients: ["carrot", "zucchini", "eggs", "cottage cheese", "rice flour"]
    },
    {
        title: "Avocado Zucchini Pancakes",
        description: "Soft savoury pancakes with mashed avocado. Mash the avocado, grate and squeeze the zucchini, and combine with egg and flour. Cook on a lightly oiled pan on both sides until golden. The drier the zucchini, the better they hold.",
        category: "vegetables",
        id: "seed-0041-avocado-zucchini-pancakes",
        ingredients: ["avocado", "zucchini", "eggs", "flour"]
    },
    {
        title: "Zucchini Pizza Base",
        description: "A grated-zucchini base that works as a quick pizza. Squeeze the zucchini very dry, mix with egg, flour, and spices, spread onto an oiled pan, and cook covered on low heat. Flip with a plate, add toppings like tomato, mushrooms, and cheese, and cook until melted.",
        category: "vegetables",
        id: "seed-0042-zucchini-pizza",
        ingredients: ["zucchini", "eggs", "flour", "tomato", "cheese"]
    },
    {
        title: "Carrot Button Noodles",
        description: "Chewy carrot dumplings shaped like little buttons. Boil carrot until tender and mash while hot, work in glutinous rice flour to a smooth dough, then pinch off pieces, roll into balls, and press a dimple in each. Boil until they float, about three minutes.",
        category: "vegetables",
        id: "seed-0043-carrot-button-noodles",
        ingredients: ["carrot", "rice flour", "garlic", "soy sauce"]
    }
];
