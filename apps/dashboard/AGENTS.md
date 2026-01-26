# Nuxt Admin Dashboard

An admin dashboard built with Nuxt 3, Shadcn-vue components, and TailwindCSS.

## Tech Stack

- **Framework**: Nuxt 3 (latest)
- **UI Components**: Shadcn-vue (New York style)
- **Styling**: TailwindCSS with CSS variables
- **Icons**: Lucide icons

## Quick Commands

```bash
pnpm dev            # Development server
pnpm build          # Production build
pnpm preview        # Preview production build
pnpm lint           # ESLint
```

## Adding Shadcn Components

Use the shadcn CLI to add components:

```bash
pnpm dlx shadcn-vue@latest add button
pnpm dlx shadcn-vue@latest add dialog
pnpm dlx shadcn-vue@latest add form
```

Or use the MCP server with natural language prompts (see MCP section below).

## Directory Structure

```
app/
├── assets/css/     # TailwindCSS styles
├── components/     # Vue components
│   ├── ui/        # Shadcn UI components (auto-generated)
│   └── ...        # Custom components
├── composables/    # Vue composables
├── constants/      # App constants
├── layouts/        # Page layouts
├── lib/           # Utility functions
├── pages/         # File-based routing
├── plugins/       # Nuxt plugins
└── types/         # TypeScript types
```

## Component Conventions

### Shadcn Components

Located in `app/components/ui/`. Do NOT manually edit these - use CLI to update.

### Custom Components

Create in `app/components/` following Vue 3 Composition API:

```vue
<script setup lang="ts">
// Props, emits, composables
</script>

<template>
  <!-- Template -->
</template>
```

### Composables

Create in `app/composables/` with `use` prefix:

```typescript
// composables/useAuth.ts
export function useAuth() {
  // ...
}
```

## Shadcn Configuration

See [components.json](components.json) for Shadcn configuration:

- Style: New York
- Base color: Neutral
- CSS Variables: Enabled
- Icon Library: Lucide

## MCP Integration

This project supports shadcn MCP server. With MCP configured, you can:

- "Show me all available components in the shadcn registry"
- "Add the dialog and form components to my project"
- "Create a data table with pagination"

## Documentation References

- Shadcn-vue: https://www.shadcn-vue.com/
- Nuxt 3: https://nuxt.com/docs
- TailwindCSS: https://tailwindcss.com/docs
