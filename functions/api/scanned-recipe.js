export async function onRequest(context){
    
    const body = await context.request.json();
    const file = body.file;
    const [dataURLPrefix, fileBase64] = file.split(",");
    const mediaType = dataURLPrefix.split(":")[1].split(";")[0];
    const sizeBytes = fileBase64.length * 3 / 4;
    return new Response(`${sizeBytes} bytes, type ${mediaType}`);
    
}
