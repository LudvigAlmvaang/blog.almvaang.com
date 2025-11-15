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
    <meta property="og:title" content="Ludvig's Blog" />
    <meta property="og:description" content="A variety blog by Ludvig Almvång covering personal events, litterature, video games and technology" />
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
            <img src="/icons/creative-commons.svg" alt="Creative Commons License" width="18" height="18">
            <small>${new Date().getFullYear()} Ludvig S.W. Almvång</small>
            <small>–</small>
            <small>Code licensed MIT, content CC BY-NC-ND 4.0</small>
          </p>
      </footer>
    </main>
    <script>
      (function(){
        function setExternalLinkTargets(root){
          root = root || document;
          try{
            const anchors = root.querySelectorAll ? root.querySelectorAll('a[href^="http"]') : [];
            anchors.forEach(a => {
              try{
                const url = new URL(a.href, location.href);
                if(url.origin !== location.origin){
                  a.setAttribute('target', '_blank');
                  a.setAttribute('rel', 'noopener noreferrer');
                }
              }catch(e){ /* ignore invalid URLs */ }
            });
          }catch(e){ /* safe no-op */ }
        }

        // Apply on initial load
        document.addEventListener('DOMContentLoaded', function(){ setExternalLinkTargets(document); });

        // Reapply after HTMX swaps (supports both htmx.onLoad and legacy events)
        if(window.htmx && typeof htmx.onLoad === 'function'){
          htmx.onLoad(function(elt){ setExternalLinkTargets(elt); });
        } else {
          document.addEventListener('htmx:afterSwap', function(e){ setExternalLinkTargets(e.detail && e.detail.elt ? e.detail.elt : document); });
        }
      })();
    </script>
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
      <p>This blog is powered by <strong>Cloudflare Workers</strong> (serverless backend), <strong>HTMX</strong> (dynamic navigation), <strong>Giscus</strong> (comments via GitHub Discussions), <strong>Marked</strong> (Markdown parsing), and <strong>PicoCSS</strong> (semantic, classless styling).</p>
      <p>It is a modern, minimal, and open-source web application designed for fast iteration and learning.</p>
      <p><a href="/" hx-get="/" hx-target="#content" hx-swap="outerHTML" hx-push-url="true">← Back to Home</a></p>
    </article>
    <script>document.title = 'About';</script>
  </section>`;
}

/**
 * Render individual blog post
 */
export function renderPostContent(post) {
  const dateDisplay = post.updated 
    ? `<p><small>Published ${escapeHTML(post.date)}<br>Updated ${escapeHTML(post.updated)}</small></p>`
    : `<p><small>Published ${escapeHTML(post.date)}</small></p>`;
  
  return `<section id="content">
    <article>
        <h2>${escapeHTML(post.title)}</h2>
        ${dateDisplay}
      ${post.content}
      <footer>
        <p><a href="/" hx-get="/" hx-target="#content" hx-swap="outerHTML" hx-push-url="true">← Back to Home</a></p>
      </footer>
    </article>

    <!-- Giscus comments -->
    <article>
      <div id="giscus-container">
        <script src="https://giscus.app/client.js"
          data-repo="LudvigAlmvaang/blog.almvaang.com"
          data-repo-id="R_kgDOQVnD2A"
          data-category="Comments"
          data-category-id="DIC_kwDOQVnD2M4Cxyvx"
          data-mapping="pathname"
          data-strict="1"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-theme="light"
          data-lang="en"
          crossorigin="anonymous"
          async>
        </script>
      </div>
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
