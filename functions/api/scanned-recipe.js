export async function onRequest(context){
    
    const body = await context.request.json();
    const file = body.file;
    const [dataURLPrefix, fileBase64] = file.split(",");
    const mediaType = dataURLPrefix.split(":")[1].split(";")[0];
    const sizeBytes = fileBase64.length * 3 / 4;
    const prompt = `This is most probably a screenshot of a recipe or a photo of a written recipe. I need to extract a JSON object from it. No prose, no markdown code fences. Use the language that the text is using, except for categories: these are in english.

Extract the JSON object with these exact keys:

- title: if there is a title for the recipe use it for this key.
    - If the title in this image was in all caps, convert to normal capitalization for the title's language.
    - Remove emojis, if that does not reduce meaning of the title.
  If there is no title:
    - Create a title for a recipe that you read in this image.
    - Make title short and descriptive.
- description: the cooking method, as prose if this is what's in the image; or as unnumbered steps if the image shows description in steps, numbered or not.
    - Each step must sit on its own line.
    - Cut from the recipe description: commentary, encouragement, jokes, repetition. Never change: doneness cue ("until soft", "until golden"), safety warning from the source, every action, quantity, time, temperature, and their order. Variations of recipe stay, condensed by the same rule.
    - No new words or steps that aren't in the source
   
- category: exactly one of: breakfast, vegetables, soups, snacks, meat, uncategorized. Use uncategorized if unsure
- ingredients: an array of strings. If the recipe source provides ingredient quantity, such an ingredient is listed with their quantity. 
    - If a recipe contains base ingredients and optional ingredients, or recipe variations that list optional ingredients, then only base ingredients are populated into the ingredients section. 
    - Use the neutral, non-diminutive, non-slang, non-surzhik form of the ingredient name: "водичка → вода", "яєчки → яйця", "мука → борошно (if recipe is in Ukrainian)". only change the name if you’re certain of the neutral form; otherwise keep the original.
    - If an ingredient has no quantity specified, keep the original wording for it, but still use the neutral name. for example: "oil for frying", "a pinch of salt" , "pepper to taste". This means the original wording stays: "сіль за смаком", "щіпка солі". 
    - When you write ingredients, name goes first, then the amount, separated by a space only: "flour 200 g", "eggs 2", "яйця 1 шт".
    - Keep countable ingredients plural even when the quantity is 1. Uncountable stay as they are.
    - Name must be in nominative: "борошно", not "борошна". 
    - Leave water out of the ingredients' list unless there is an exact amount in the recipe. `
   const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": context.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",

        },
        body: JSON.stringify({
            model: "claude-sonnet-5-5",
            max_tokens: 2000,
            messages: [{
                role: "user",
                content: [
                    {
                        type: "image", source: { type: "base64", media_type: mediaType, data: fileBase64, } },
                        { type: "text", text: prompt},
                    ],
                }],
            }),
        });
        if (!apiRes.ok) {
            console.log(apiRes.status);
            return Response.json({ error: "upstream failed" }, { status: 500 });
        } 
        const data = await apiRes.json();
        console.log(data.stop_reason, data.usage.output_tokens);
        return new Response(data.content[0].text);
        
        
        
    
}
