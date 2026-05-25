# AI publishing instructions

This repository is structured so future AI agents can publish content with minimal changes.

## Add a post

Create a Markdown or MDX file in `src/content/posts/`.

Use this frontmatter:

```yaml
title: "Article title"
date: 2026-05-25
tags: ["Tag"]
category: "Notes"
description: "One precise sentence for previews and SEO."
draft: false
featured: false
author: "Damir"
```

Then write the article body below the frontmatter.

## Rules

- Do not change route structure for normal publishing.
- Keep posts portable Markdown.
- Use `draft: true` until the article is ready.
- Use concise tags and one category.
- Run `npm run build` before publishing when working locally.

## Add a project

Create a Markdown file in `src/content/projects/` with title, date, status, description, tags, featured, and links.
