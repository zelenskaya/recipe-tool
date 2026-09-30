export async function onRequest(context){
    const body = await context.request.json();
    return new Response(body.file.length);
    
}
