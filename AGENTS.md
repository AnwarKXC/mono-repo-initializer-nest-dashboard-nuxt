# Monorepo - NestJS Backend + Nuxt Dashboard + Nuxt Portfolio

This is a pnpm monorepo containing a scalable NestJS backend API, a Shadcn-based admin dashboard,
and a Nuxt UI portfolio frontend.

## Package Manager

This project uses **pnpm workspaces**.

```bash
pnpm install          # Install all dependencies
pnpm dev              # Run all apps in parallel
pnpm build            # Build all apps
pnpm lint             # Lint all apps
```

## Workspace Structure

| Path              | Description               | Tech Stack                      |
| ----------------- | ------------------------- | ------------------------------- |
| `apps/backend/`   | REST API with Prisma ORM  | NestJS, Prisma, PostgreSQL      |
| `apps/dashboard/` | Admin dashboard UI        | Nuxt 3, Shadcn-vue, TailwindCSS |
| `apps/frontend/`  | Portfolio/Marketing site  | Nuxt 3, Nuxt UI, Nuxt Content   |
| `packages/`       | Shared packages (future)  | TypeScript                      |
| `libs/`           | Shared libraries (future) | TypeScript                      |

## App-Specific Documentation

Each app has its own `AGENTS.md` with detailed instructions:

- Backend API: [apps/backend/AGENTS.md](apps/backend/AGENTS.md)
- Dashboard: [apps/dashboard/AGENTS.md](apps/dashboard/AGENTS.md)
- Frontend: [apps/frontend/AGENTS.md](apps/frontend/AGENTS.md)

## Quick Commands Reference

```bash
# Individual app development
pnpm dev:backend      # http://localhost:3000/api
pnpm dev:dashboard    # http://localhost:3001
pnpm dev:frontend     # http://localhost:3002

# Database (Prisma)
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run migrations
pnpm prisma:studio    # Open Prisma Studio
```

## Environment Setup

1. Copy `apps/backend/.env.example` to `apps/backend/.env`
2. Configure `DATABASE_URL` with PostgreSQL connection string
3. Run `pnpm prisma:migrate` to set up database

## MCP Configuration

This workspace has MCP servers configured for AI assistants. See `.vscode/mcp.json` for VS Code /
GitHub Copilot integration.