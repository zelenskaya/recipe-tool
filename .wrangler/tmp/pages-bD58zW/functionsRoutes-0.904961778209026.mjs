import { onRequest as __api_ingredients_js_onRequest } from "/Users/annazelenska/Documents/recipe-tool/functions/api/ingredients.js"
import { onRequest as __api_ping_js_onRequest } from "/Users/annazelenska/Documents/recipe-tool/functions/api/ping.js"

export const routes = [
    {
      routePath: "/api/ingredients",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_ingredients_js_onRequest],
    },
  {
      routePath: "/api/ping",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_ping_js_onRequest],
    },
  ]