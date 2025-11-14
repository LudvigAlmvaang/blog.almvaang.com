/**
 * HTML Response helper
 */
export function htmlResponse(content, status = 200) {
  return new Response(content, {
    status,
    headers: { "Content-Type": "text/html; charset=UTF-8" },
  });
}

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHTML(str) {
  return str.replace(/[&<>"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
  }[c]));
}

/**
 * Truncate HTML content by stripping tags and cutting at word boundary
 */
export function truncate(html, length) {
  // Strip HTML tags to get raw text
  const text = html
    .replace(/<[^>]+>/g, '') // remove HTML tags
    .replace(/\s+/g, ' ')    // normalize whitespace
    .trim();

  if (text.length <= length) {
    // No truncation needed
    return `<p>${escapeHTML(text)}</p>`;
  }

  // Cut cleanly at word boundary
  let snippet = text.slice(0, length);
  const lastSpace = snippet.lastIndexOf(' ');
  if (lastSpace > 0) snippet = snippet.slice(0, lastSpace);

  // Add ellipsis at the end
  snippet = snippet.trim() + '…';

  return `<p>${escapeHTML(snippet)}</p>`;
}
