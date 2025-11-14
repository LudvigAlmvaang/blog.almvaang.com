# blog.almvaang.com

A modern blog powered by **Cloudflare Workers**, **HTMX**, and **Markdown**.

## Development

### Prerequisites

- Node.js 20+
- npm

### Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build markdown posts:**
   ```bash
   npm run build:posts
   ```
   This discovers all `.md` files in `content/posts/` and generates `src/data/posts.js`.

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The blog will be available at `http://localhost:8787`

### Adding Posts

Create a new markdown file in `content/posts/` with front matter:

```markdown
---
title: Your Post Title
date: 2025-11-14
slug: your-post-slug
---

Your markdown content here with **full GitHub Flavored Markdown support**.

- Lists
- Code blocks
- Tables
- Strikethrough
- And more!
```

Then run `npm run build:posts` to regenerate the posts.

### Important: Build Step Required

**Before running `npm run dev` or `npm run deploy`, you must run `npm run build:posts`.**

The `package.json` scripts already do this automatically:
- `npm run dev` → runs `npm run build:posts && wrangler dev`
- `npm run deploy` → runs `npm run build:posts && wrangler deploy`

### Deployment

Push to the `main` branch and GitHub Actions will automatically:
1. Run `npm run build:posts` to discover and parse markdown posts
2. Deploy to Cloudflare Workers

No manual deployment needed!

## Supported Markdown Features

- **Bold**, *italic*, ~~strikethrough~~
- Headings, lists, tables
- Code blocks with syntax highlighting
- Task lists
- Images and links
- Blockquotes
- And all GitHub Flavored Markdown features!

## Licensing

- All **code** in this repository is licensed under the **MIT License**.
- All **written content** in `content/` is licensed under **CC BY-NC-ND 4.0**.

See the LICENSE file for full details.
