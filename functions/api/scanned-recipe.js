export async function onRequest(context){
    return new Response(context.request.method);
    
}
