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
- description: the cooking method, as prose. If the image has separate steps for the recipe, convert them to steps in the description, but these steps should not be numbered. Each step must sit on its own line.
- category: exactly one of: breakfast, vegetables, soups, snacks, meat, uncategorized. Use uncategorized if unsure
- ingredients: an array of strings, each with its quantity, e.g. "200g flour". If an ingredient has no quantity specified, keep the original wording for it. for example: "oil for frying", "a pinch of salt" , "pepper to taste"
- sourceUrl: empty string`
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
