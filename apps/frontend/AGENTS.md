# Nuxt Portfolio Frontend

A portfolio/marketing website built with Nuxt 3, Nuxt UI, and Nuxt Content.

## Tech Stack

- **Framework**: Nuxt 3 (latest)
- **UI Components**: Nuxt UI
- **Content**: Nuxt Content (Markdown/MDC)
- **Styling**: TailwindCSS via Nuxt UI

## Quick Commands

```bash
pnpm dev            # Development server
pnpm build          # Production build
pnpm preview        # Preview production build
pnpm lint           # ESLint
```

## Directory Structure

```
app/
├── assets/         # Static assets, styles
├── components/     # Vue components
├── layouts/        # Page layouts
├── pages/          # File-based routing
└── utils/          # Utility functions

content/            # Markdown content files
├── blog/          # Blog posts
└── ...            # Other content

public/             # Static files (served as-is)
```

## Content Management

This project uses **Nuxt Content** for content-driven pages.

### Creating Content

Add Markdown files in `content/` directory:

```markdown
---
title: My Blog Post
description: A description
date: 2024-01-01
---

# Content here
```

### Querying Content

```vue
<script setup lang="ts">
const { data } = await useAsyncData('posts', () => queryContent('/blog').find())
</script>
```

## Nuxt UI Components

Use Nuxt UI components with `U` prefix:

```vue
<template>
  <UButton>Click me</UButton>
  <UCard>
    <template #header>Title</template>
    Content
  </UCard>
</template>
```

## Component Conventions

### Page Components

Create in `app/pages/` for automatic routing:

- `pages/index.vue` → `/`
- `pages/about.vue` → `/about`
- `pages/blog/[slug].vue` → `/blog/:slug`

### Reusable Components

Create in `app/components/`:

```vue
<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div>{{ title }}</div>
</template>
```

## Configuration

See [nuxt.config.ts](nuxt.config.ts) for Nuxt configuration.
See [content.config.ts](content.config.ts) for Content configuration.

## Documentation References

- Nuxt UI: https://ui.nuxt.com/
- Nuxt Content: https://content.nuxt.com/
- Nuxt 3: https://nuxt.com/docs
