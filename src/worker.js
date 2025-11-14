import { handleRequest } from "./router.js";

export default {
  async fetch(request, env, ctx) {
    const isHtmx = request.headers.get("HX-Request") === "true";
    return handleRequest(request, isHtmx);
  },
};
