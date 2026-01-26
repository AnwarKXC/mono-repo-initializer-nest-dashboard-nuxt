# NestJS Backend API

A scalable NestJS REST API with Prisma ORM following enterprise patterns and best practices.

## Tech Stack

- **Framework**: NestJS 11 (latest)
- **ORM**: Prisma 7 with PostgreSQL adapter
- **Validation**: class-validator, class-transformer
- **Configuration**: @nestjs/config with typed configs

## Quick Commands

```bash
pnpm start:dev      # Development with hot reload
pnpm build          # Production build
pnpm start:prod     # Run production build
pnpm lint           # ESLint with auto-fix
pnpm test           # Run unit tests
```

## Architecture Overview

```
src/
├── common/         # Shared utilities (guards, filters, decorators, interceptors)
├── config/         # Environment-based configuration modules
├── database/       # Prisma service (global module)
├── modules/        # Feature modules (users, health, etc.)
├── shared/         # Shared DTOs, interfaces, utilities
└── generated/      # Prisma generated client (auto-generated)
```

## Key Conventions

### Module Structure

Each feature module follows this pattern:

```
modules/{feature}/
├── dto/                    # Data Transfer Objects
│   ├── create-{feature}.dto.ts
│   ├── update-{feature}.dto.ts
│   └── index.ts
├── {feature}.controller.ts # HTTP endpoints
├── {feature}.service.ts    # Business logic
├── {feature}.module.ts     # Module definition
└── index.ts               # Barrel export
```

### API Endpoints

All endpoints are prefixed with `/api`. Example:

- `GET /api/health` - Health check
- `GET /api/users` - List users (paginated)
- `POST /api/users` - Create user

### Database Access

Use `PrismaService` injected via constructor - it's a global module:

```typescript
constructor(private readonly prisma: PrismaService) {}
```

### Validation

Use class-validator decorators on DTOs. ValidationPipe is globally enabled with:

- `whitelist: true` - Strip unknown properties
- `forbidNonWhitelisted: true` - Error on unknown properties
- `transform: true` - Auto-transform to DTO instances

## Documentation References

For detailed conventions and patterns:

- **NestJS Conventions**: [docs/NESTJS.md](docs/NESTJS.md) - Module structure, controllers, services, DTOs
- **API Design**: [docs/API.md](docs/API.md) - REST standards, response formats, status codes
- **Prisma Guide**: [docs/PRISMA.md](docs/PRISMA.md) - Schema conventions, queries, migrations
- **Prisma Schema**: [prisma/schema.prisma](prisma/schema.prisma) - Current database models
