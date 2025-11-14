/**
 * Markdown Loader - No longer needed!
 * 
 * Markdown parsing now happens at build time in scripts/build-posts.js
 * Posts are pre-rendered to HTML before being bundled.
 * 
 * This file is kept for reference but is no longer used.
 */

// Kept for backwards compatibility if needed, but parseMarkdown is no longer called
export function parseMarkdown(content) {
  console.warn("parseMarkdown is deprecated - markdown is parsed at build time");
  return {};
}

