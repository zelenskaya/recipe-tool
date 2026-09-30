export async function onRequest(context){
    const body = await context.request.text();
    return new Response(body);
    
}
