export async function onRequest(context) {
    /*const IMG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGP4z8AAAAMBAQDJ/pLvAAAAAElFTkSuQmCC";*/
    const body = await context.request.json();
    const base64 = body.image;
    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": context.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",

        },
        body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 512,
            messages: [{
                role: "user",
                content: [
                    {
                        type: "image", source: { type: "base64", media_type: "image/webp", data: base64, } },
                        { type: "text", text: "List the food ingredients you see. Reply with only a JSON array of lowercase strings, nothing else."},
                    ],
                }],
            }),
        });
        const data = await apiRes.json();
        const text = data.content[0].text;
        const cleaned = text.replaceAll("```json", "").replaceAll("```","").trim();
        
        
        const list = JSON.parse(cleaned);
        return Response.json(list);
    }