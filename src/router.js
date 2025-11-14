import { htmlResponse } from "./utils/helpers.js";
import {
  renderLayout,
  renderBlogIndexContent,
  renderAboutContent,
  renderPostContent,
  renderNotFoundContent,
} from "./components/layout.js";
import { posts } from "./data/posts.js";

/**
 * Route a request to the appropriate handler
 */
export function handleRequest(request, isHtmx) {
  const url = new URL(request.url);

  // Home page
  if (url.pathname === "/" || url.pathname === "/index.html") {
    const body = renderBlogIndexContent();
    return htmlResponse(isHtmx ? body : renderLayout("Ludvig's Blog", body));
  }

  // About page
  if (url.pathname === "/about") {
    const body = renderAboutContent();
    return htmlResponse(isHtmx ? body : renderLayout("About", body));
  }

  // Individual blog post
  const match = url.pathname.match(/^\/post\/([a-z0-9-]+)$/);
  if (match) {
    const slug = match[1];
    const post = posts.find(p => p.slug === slug);
    if (post) {
      const body = renderPostContent(post);
      return htmlResponse(isHtmx ? body : renderLayout(post.title, body));
    }
  }

  // 404 Not found
  const notFoundBody = renderNotFoundContent();
  return htmlResponse(
    isHtmx ? notFoundBody : renderLayout("404 Not Found", notFoundBody),
    404
  );
}
