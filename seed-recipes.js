// Seed recipes for Maya Approves? — Hofgut (Hohenloher Molkerei) German demo branch.
// Descriptions feature Hofgut products; ingredients stay generic lowercase tokens so the fridge matcher scores them.
// category values are the app's stable keys (breakfast/vegetables/soups/snacks/meat) — NEVER translated; German labels live in strings.de.js.
// ids are ASCII slugs; regenerate with crypto.randomUUID() if you prefer.

const seedRecipes = [
    {
        title: "Grießbrei mit Vanille",
        description: "Ein warmer, cremiger Klassiker, den schon die Kleinsten löffeln können. Hofgut Frische Vollmilch mit einer Prise Zucker und Vanille erhitzen, den Grieß einrühren und unter Rühren quellen lassen, bis der Brei sämig ist. Zum Schluss ein Stück Hofgut Süßrahmbutter unterrühren.",
        category: "breakfast",
        id: "seed-0001-griessbrei-vanille",
        ingredients: ["milch", "grieß", "butter", "zucker", "vanille"]
    },
    {
        title: "Buttermilch-Waffeln",
        description: "Besonders fluffige Waffeln, die dank Hofgut Reiner Buttermilch schön locker werden und gut in kleine Hände passen. Mehl, Eier, zerlassene Hofgut Süßrahmbutter und Buttermilch zu einem glatten Teig verrühren und portionsweise goldbraun ausbacken. Lauwarm servieren, gern mit etwas Obst.",
        category: "breakfast",
        id: "seed-0002-buttermilch-waffeln",
        ingredients: ["buttermilch", "mehl", "eier", "butter", "zucker"]
    },
    {
        title: "Beeren-Sahnejoghurt mit Haferflocken",
        description: "Ein schneller Snack mit Frucht und cremiger Note. Hofgut Sahnejoghurt mit weichen Beeren und zerdrückter Banane verrühren und mit ein paar zarten Haferflocken bestreuen. Für kleine Kinder die Beeren fein zerdrücken.",
        category: "snacks",
        id: "seed-0003-beeren-sahnejoghurt",
        ingredients: ["joghurt", "beeren", "banane", "haferflocken"]
    },
    {
        title: "Cremiges Kartoffelpüree",
        description: "Sämiges Püree, das als weiche Beilage ideal für Kleinkinder ist. Gekochte Kartoffeln stampfen und mit warmer Hofgut Frischer Vollmilch und einem großzügigen Stück Hofgut Süßrahmbutter cremig rühren. Mit wenig Salz abschmecken.",
        category: "vegetables",
        id: "seed-0004-kartoffelpueree",
        ingredients: ["kartoffel", "milch", "butter", "salz"]
    },
    {
        title: "Kürbis-Cremesuppe",
        description: "Eine milde, samtige Suppe in leuchtendem Orange. Kürbis, Kartoffel und Zwiebel weich köcheln, fein pürieren und mit einem Schuss Hofgut Frischer Schlagsahne verfeinern. Vor dem Servieren auf eine kindgerechte Temperatur abkühlen lassen.",
        category: "soups",
        id: "seed-0005-kuerbis-cremesuppe",
        ingredients: ["kürbis", "kartoffel", "zwiebel", "sahne", "salz"]
    },
    {
        title: "Mini-Frikadellen mit Kräuter-Dip",
        description: "Kleine, weiche Frikadellen, die sich gut greifen lassen. Hackfleisch mit Ei, Semmelbröseln und feiner Petersilie mischen, zu kleinen Bällchen formen und sanft garen. Dazu ein milder Dip aus Hofgut Frischer Saurer Sahne.",
        category: "meat",
        id: "seed-0006-mini-frikadellen",
        ingredients: ["hackfleisch", "eier", "semmelbrösel", "saure sahne", "petersilie"]
    }
];