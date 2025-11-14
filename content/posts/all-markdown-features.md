---
title: All Markdown Features
date: 2025-11-14
slug: all-markdown-features
---

# All Markdown Features

This post demonstrates almost every Markdown feature supported by the site (GFM-enabled).

## Text formatting

This is *italic*, this is **bold**, this is ***bold italic***, and this is ~~strikethrough~~.

Inline code: `const x = 42;` and a code span with backticks `` `not code` ``.

## Links

- External link: https://htmx.org/
- Explicit external link: [HTMX website](https://htmx.org/)
- Internal link to a post: [Hello World](/post/hello-world)

Reference-style link: [PicoCSS][picocss]

[picocss]: https://picocss.com "PicoCSS - Minimal CSS Framework"

## Images

Inline image:

![PicoCSS logo](https://picocss.com/logo.svg "PicoCSS Logo")

HTML image (raw):

<img src="/icons/creative-commons.svg" alt="Creative Commons" width="48">

## Lists

Ordered list:

1. First
2. Second
   1. Nested first
   2. Nested second
3. Third

Unordered list:

- Alpha
- Beta
  - Beta child
  - Beta child 2

Task list:

- [x] Write example
- [ ] Add more tests
- [ ] Publish

## Tables

| Name | Description | Notes |
| --- | --- | --- |
| HTMX | AJAX for the modern web | https://htmx.org/
| PicoCSS | Minimal CSS framework | https://picocss.com/

## Code blocks

Fenced JavaScript:

```javascript
// Example function
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet('World'));
```

Fenced shell:

```bash
# install deps
npm install
```

Indented code block:

    line one
    line two

## Blockquote

> This is a blockquote. Nested:
>
> > A nested quote.

## Horizontal rule

---

## Definition list (HTML)

<dl>
  <dt>HTML term</dt>
  <dd>Definition of the term in HTML (not standard Markdown but supported by browsers).</dd>
</dl>

## Emoji and special chars

Emoji: :rocket: :sparkles: :smile:

## Autolinks and angle-bracket links

Autolink: <https://example.com>

## Raw HTML block

<div style="border:1px dashed #ccc; padding:8px;">
  <strong>Note:</strong> This is raw HTML inside the markdown.
</div>

## Footnotes

Markdown footnote example[^1].

[^1]: This is the footnote content.

## Conclusion

That's it — a comprehensive test post with most Markdown features.
