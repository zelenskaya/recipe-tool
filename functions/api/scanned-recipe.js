
const SERVER_RECIPE_SCAN_TIMEOUT_MS = 25_000;
const SERVER_TOTAL_TIME_BUDGET_MS = 35_000;

async function tryToCallAI(prompt, apiKey, mediaType, fileBase64) {
    const serverAbortController = new AbortController();
    const timeoutId = setTimeout(() => serverAbortController.abort(), SERVER_RECIPE_SCAN_TIMEOUT_MS);

    let apiRes;
    try {
        apiRes = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",

            },
            body: JSON.stringify({
                model: "claude-sonnet-5-5",
                max_tokens: 3000,
                messages: [{
                    role: "user",
                    content: [
                        {
                            type: "image", source: { type: "base64", media_type: mediaType, data: fileBase64, }
                        },
                        { type: "text", text: prompt },
                    ],
                }],
            }),
            signal: serverAbortController.signal
        });
        return apiRes;
    }

    finally {
        clearTimeout(timeoutId);
    }

}


export async function onRequest(context) {

    const startTime = Date.now();
    const body = await context.request.json();
    const file = body.file;
    const [dataURLPrefix, fileBase64] = file.split(",");
    const mediaType = dataURLPrefix.split(":")[1].split(";")[0];
    const sizeBytes = fileBase64.length * 3 / 4;



    const prompt = `This is most probably a screenshot of a recipe or a photo of a written recipe.
    Users upload screenshots from social media, photos of cookbooks, or photos of handwritten notes with many recipes.
    The image may contain more than one recipe, or parts of recipes cut off at the edges.
    - Parts of one meal described together in one text (e.g. meat with a side dish) are one recipe: keep all parts.
    - Separate recipes usually have their own titles or headings. If there are several, extract only one: the most complete one.
    If several are equally complete, choose the one the post or page is mainly about. Never merge separate recipes.
    Ignore everything that belongs to other recipes.
    I need to extract a JSON object from it. No prose, no markdown code fences. Use the language that the text is using, except for categories: these are in english.

Extract the JSON object with these exact keys:

- title: if there is a title for the recipe use it for this key.
    - If the title in this image was in all caps, convert to normal capitalization for the title's language.
    - Remove emojis, if that does not reduce meaning of the title.
  If there is no title:
    - Create a title for a recipe that you read in this image. If parts of one meal are described together in one text (e.g. meat with a side dish), put the recipe's focus first.
    - Make title short and descriptive.
- description: the cooking method, as prose if this is what's in the image; or as unnumbered steps if the image shows description in steps, numbered or not.
    - Each step must sit on its own line.
    -  Cut from the recipe description: commentary, encouragement, jokes, repetition. Never change: doneness cue ("until soft", "until golden"), every action, quantity, time, temperature, and their order. Variations of recipe stay, condensed by the same rule.
    - Keep every safety note from the source, in its original place: digestive effects ("can loosen stool"), storage ("keep in the fridge", "eat within 2 days"), burn risk ("very hot inside", "oil may spatter"), age or allergy notes ("not for children under 1", "contains nuts"). These are examples; keep any similar warning.
    - No new words or steps that aren't in the source
    - If the source is ambigious (e.g. "add the onion" when there are two onion portions), keep it ambigious. Do not add words to clarify.
   
- category: exactly one of: breakfast, vegetables, soups, snacks, meat, uncategorized. Use uncategorized if unsure
- ingredients: an array of strings. If the recipe source provides ingredient quantity, such an ingredient is listed with their quantity. 
    - If a recipe contains base ingredients and optional ingredients, or recipe variations that list optional ingredients, then only base ingredients are populated into the ingredients section. 
    - Use the neutral, non-diminutive, non-slang, non-surzhik form of the ingredient name: "водичка → вода", "яєчки → яйця", "мука → борошно (if recipe is in Ukrainian)". only change the name if you’re certain of the neutral form; otherwise keep the original.
    - If an ingredient has no quantity specified, keep the original wording for it, but still use the neutral name. for example: "oil for frying", "a pinch of salt" , "pepper to taste". This means the original wording stays: "сіль за смаком", "щіпка солі". 
    - When you write ingredients, name goes first, then the amount, separated by a space only: "flour 200 g", "eggs 2", "яйця 1 шт".
    - Keep countable ingredients plural even when the quantity is 1. Uncountable stay as they are.
    - Name must be in nominative: "борошно", not "борошна". 
    - Leave water out of the ingredients' list unless there is an exact amount in the recipe. `

    let resultAI;
    for (let attempt = 1; attempt <= 2; attempt++) {
        try {
            resultAI = await tryToCallAI(prompt, context.env.ANTHROPIC_API_KEY, mediaType, fileBase64);
            if (resultAI.ok) break;
            if ((resultAI.status === 400) || (resultAI.status === 413)) {
                console.log(resultAI.status);
                return Response.json({ error: "invalidImage" }, { status: 422 });
            } else {
                if ((resultAI.status > 400) && (resultAI.status <= 499)) {
                    return Response.json({ error: "upstream failed" }, { status: 500 });
                }

            }

        }

        catch (error) {
            if (error.name === "AbortError") {
                return Response.json({ error: "replyTooSlow" }, { status: 504 });
            } else {
                const timeLeft = (SERVER_TOTAL_TIME_BUDGET_MS - (Date.now() - startTime));
                const canRetry = (!((attempt === 1) && (timeLeft >= SERVER_RECIPE_SCAN_TIMEOUT_MS)));
                if (canRetry) {
                    return Response.json({ error: "apiUnreachable" }, { status: 502 });
                }

            }
        }

    }



    if (!resultAI.ok) {
        console.log(resultAI.status);
        return Response.json({ error: "upstream failed" }, { status: 500 });
    }
    const data = await resultAI.json();
    const types = data.content.map(item => item.type);
    console.log(data.stop_reason, data.usage.output_tokens, types);
    if (data.stop_reason === "max_tokens") {
        return Response.json({ error: "replyTooLong" }, { status: 422 });
    }
    const dataText = data.content.find(item => item.type === "text");
    return new Response(dataText.text);

}






