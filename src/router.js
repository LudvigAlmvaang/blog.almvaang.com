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
 * Serve static files from public directory
 */
async function serveStaticFile(pathname) {
  try {
    // Map URL path to public file
    const filePath = pathname.startsWith("/") ? pathname.slice(1) : pathname;
    const response = await fetch(new URL(filePath, import.meta.url).href);
    
    if (response.ok) {
      return response;
    }
  } catch (error) {
    // File not found, continue to routing
  }
  return null;
}

/**
 * Route a request to the appropriate handler
 */
export function handleRequest(request, isHtmx) {
  const url = new URL(request.url);

  // Only serve favicon specifically
  if (url.pathname === "/favicon.svg" || url.pathname === "/favicon.ico") {
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#3498db"/>
        <rect x="20" y="20" width="60" height="15" fill="white"/>
        <rect x="20" y="40" width="60" height="8" fill="white" opacity="0.8"/>
        <rect x="20" y="52" width="60" height="8" fill="white" opacity="0.8"/>
        <rect x="20" y="64" width="40" height="8" fill="white" opacity="0.8"/>
      </svg>`,
      {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=604800", // 1 week
        },
      }
    );
  }

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
