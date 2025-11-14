import { escapeHTML, truncate } from "../utils/helpers.js";
import { posts } from "../data/posts.js";

/**
 * Render the main HTML layout
 */
export function renderLayout(title, body) {
  return `
<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light dark">
    <title>${escapeHTML(title)}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css" type="text/css">
    <script src="https://unpkg.com/htmx.org@2.0.3"></script>
  </head>
  <body>
    <main>
      <header>
        <nav>
          <ul>
            <li><a href="/" hx-get="/" hx-target="#content" hx-swap="outerHTML" hx-push-url="true">Home</a></li>
            <li><a href="/about" hx-get="/about" hx-target="#content" hx-swap="outerHTML" hx-push-url="true">About</a></li>
          </ul>
        </nav>
      </header>
      ${body}
      <footer>
        <hr />
        <p>
          <span style="display:inline-flex; align-items:center; gap:0.5em;">
            <img src="/icons/creative-commons.svg" alt="Creative Commons License" width="24" height="24">
            <span>${new Date().getFullYear()} Ludvig Almvång</span>
          </span>
        </p>
      </footer>
    </main>
  </body>
</html>`;
}

/**
 * Render blog index (homepage)
 */
export function renderBlogIndexContent() {
  const items = posts
    .map(
      p => `
      <article>
        <h2>${escapeHTML(p.title)}</h2>
        <p><small>${escapeHTML(p.date)}</small></p>
        ${truncate(p.content, 160)}
        <p><a href="/post/${p.slug}"
              hx-get="/post/${p.slug}"
              hx-target="#content"
              hx-swap="outerHTML"
              hx-push-url="true">Read more →</a></p>
      </article>
    `
    )
    .join("\n");

  // Inline script updates the <title> on HTMX swaps
  return `<section id="content">
    ${items}
    <script>document.title = "Ludvig's Blog";</script>
  </section>`;
}

/**
 * Render about page
 */
export function renderAboutContent() {
  return `<section id="content">
    <article>
      <h2>About This Blog</h2>
      <p>Hello!</p>
      <p>My name is Ludvig and I'm the author of this blog.</p>
      <p>It's built with <strong>Cloudflare Workers</strong> for serverless hosting, <strong>HTMX</strong> for seamless navigation, and <strong>PicoCSS</strong> for semantic and classless styling.</p>
      <p><a href="/" hx-get="/" hx-target="#content" hx-swap="outerHTML" hx-push-url="true">← Back to Home</a></p>
    </article>
    <script>document.title = 'About';</script>
  </section>`;
}

/**
 * Render individual blog post
 */
export function renderPostContent(post) {
  return `<section id="content">
    <article>
      <h2>${escapeHTML(post.title)}</h2>
      <p><small>${escapeHTML(post.date)}</small></p>
      ${post.content}
      <p><a href="/" hx-get="/" hx-target="#content" hx-swap="outerHTML" hx-push-url="true">← Back to Home</a></p>
    </article>
    <script>document.title = '${escapeHTML(post.title)}';</script>
  </section>`;
}

/**
 * Render 404 not found page
 */
export function renderNotFoundContent() {
  return `<section id="content">
    <h2>404 - Page not found</h2>
    <p><a href="/" hx-get="/" hx-target="#content" hx-swap="outerHTML" hx-push-url="true">Go Home</a></p>
    <script>document.title = '404 Not Found';</script>
  </section>`;
}
