export async function onRequest(context) {
    /*const IMG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGP4z8AAAAMBAQDJ/pLvAAAAAElFTkSuQmCC";*/
    const body = await context.request.json();
    const file = body.file;
    const [dataURLPrefix, fileBase64] = file.split(",");
    const mediaType = dataURLPrefix.split(":")[1].split(";")[0];
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
                        type: "image", source: { type: "base64", media_type: mediaType, data: fileBase64, } },
                        { type: "text", text: "List the food ingredients you see. Reply with only a JSON array of lowercase strings, nothing else."},
                    ],
                }],
            }),
        });
        if(!apiRes.ok){
           
            return Response.json({ error: "upstream failed" }, { status: 500 });
        }
        const data = await apiRes.json();
        console.log(JSON.stringify(data));
        const text = data.content[0].text;
        const cleaned = text.replaceAll("```json", "").replaceAll("```","").trim();
        try {
            const list = JSON.parse(cleaned);
            return Response.json(list);
        } catch (err) {
            return Response.json({ error: "parse failed"}, {status:500});

        }
        
        
    }