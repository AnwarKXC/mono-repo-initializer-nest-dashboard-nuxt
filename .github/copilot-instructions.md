# GitHub Copilot Instructions

This is a pnpm monorepo with three applications. Always use pnpm for package management.

## Workspace Structure

- `apps/backend/` - NestJS REST API with Prisma ORM
- `apps/dashboard/` - Nuxt 3 admin dashboard with Shadcn-vue
- `apps/frontend/` - Nuxt 3 portfolio site with Nuxt UI/Content

## Key Commands

```bash
pnpm install                    # Install all dependencies
pnpm dev                        # Run all apps
pnpm --filter backend dev       # Run specific app
pnpm prisma:migrate            # Run database migrations
```

## When Working on Backend

- Follow NestJS modular architecture
- Use PrismaService for database access
- Use class-validator for DTOs
- Place new modules in `apps/backend/src/modules/`
- See `apps/backend/AGENTS.md` for detailed conventions

## When Working on Dashboard

- Use Shadcn-vue components from `app/components/ui/`
- Use `pnpm dlx shadcn-vue@latest add <component>` to add new components
- Follow Vue 3 Composition API with `<script setup>`
- See `apps/dashboard/AGENTS.md` for detailed conventions

## When Working on Frontend

- Use Nuxt UI components with `U` prefix
- Use Nuxt Content for Markdown content
- See `apps/frontend/AGENTS.md` for detailed conventions

## Code Style

- TypeScript strict mode
- ESLint with auto-fix on save
- Prettier for formatting