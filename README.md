# Monorepo - NestJS + Nuxt Dashboard + Portfolio

A modern monorepo setup with a scalable NestJS backend, Nuxt Shadcn Dashboard, and Nuxt Portfolio
frontend.

## 📁 Structure

```
├── apps/
│   ├── backend/        # NestJS API with Prisma
│   ├── dashboard/      # Nuxt Shadcn Dashboard
│   └── frontend/       # Nuxt Portfolio Template
├── packages/           # Shared packages
├── libs/               # Shared libraries
├── .vscode/            # VS Code settings & MCP config
├── .cursor/            # Cursor MCP config
├── AGENTS.md           # AI Agent instructions (root)
└── pnpm-workspace.yaml
```

## 🤖 AI Agent Documentation

This project includes comprehensive documentation for AI coding agents:

| File                              | Purpose                        |
| --------------------------------- | ------------------------------ |
| `AGENTS.md`                       | Root-level workspace overview  |
| `apps/backend/AGENTS.md`          | NestJS backend conventions     |
| `apps/dashboard/AGENTS.md`        | Dashboard UI conventions       |
| `apps/frontend/AGENTS.md`         | Portfolio frontend conventions |
| `apps/backend/docs/NESTJS.md`     | NestJS patterns & practices    |
| `apps/backend/docs/API.md`        | API design standards           |
| `apps/backend/docs/PRISMA.md`     | Database & Prisma guide        |
| `.github/copilot-instructions.md` | GitHub Copilot config          |
| `.cursorrules`                    | Cursor AI rules                |

### MCP Configuration

Shadcn MCP is pre-configured for:

- **VS Code**: `.vscode/mcp.json`
- **Cursor**: `.cursor/mcp.json`
- **Claude Code**: `.mcp.json`

Use natural language prompts like:

- "Add the button and dialog components from shadcn"
- "Create a data table with sorting and pagination"

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- PostgreSQL database

### Installation

```bash
# Install all dependencies
pnpm install

# Generate Prisma client
pnpm prisma:generate
```

### Environment Setup

1. Copy the environment example file in the backend:

```bash
cp apps/backend/.env.example apps/backend/.env
```

2. Update the `DATABASE_URL` in `apps/backend/.env` with your PostgreSQL connection string.

### Database Setup

```bash
# Run database migrations
pnpm prisma:migrate

# Open Prisma Studio (optional)
pnpm prisma:studio
```

## 🏃 Running the Applications

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run individual apps
pnpm dev:backend    # NestJS API at http://localhost:3000/api
pnpm dev:dashboard  # Dashboard at http://localhost:3001
pnpm dev:frontend   # Frontend at http://localhost:3002
```

### Production

```bash
# Build all apps
pnpm build

# Start all apps
pnpm start
```

## 📦 Project Details

### Backend (NestJS)

A scalable NestJS backend following best practices:

- **Architecture**: Modular architecture with feature modules
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Class-validator with DTOs
- **Configuration**: Environment-based configuration
- **Security**: Guards, filters, and interceptors

#### Folder Structure

```
apps/backend/src/
├── common/             # Shared utilities
│   ├── constants/     # App constants
│   ├── decorators/    # Custom decorators
│   ├── filters/       # Exception filters
│   ├── guards/        # Auth guards
│   ├── interceptors/  # Request/Response interceptors
│   └── pipes/         # Validation pipes
├── config/            # Configuration files
├── database/          # Database module (Prisma)
├── modules/           # Feature modules
│   ├── health/       # Health check endpoints
│   └── users/        # Users CRUD module
├── shared/            # Shared code
│   ├── dto/          # Common DTOs
│   ├── interfaces/   # TypeScript interfaces
│   └── utils/        # Utility functions
└── generated/         # Prisma generated client
```

### Dashboard (Nuxt Shadcn)

A beautiful admin dashboard built with Nuxt and Shadcn UI components.

### Frontend (Portfolio)

A portfolio template built with Nuxt UI.

## 🛠️ Available Scripts

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `pnpm dev`             | Run all apps in development mode           |
| `pnpm build`           | Build all apps                             |
| `pnpm lint`            | Lint all apps                              |
| `pnpm test`            | Run tests for all apps                     |
| `pnpm clean`           | Clean all node_modules and build artifacts |
| `pnpm prisma:generate` | Generate Prisma client                     |
| `pnpm prisma:migrate`  | Run database migrations                    |
| `pnpm prisma:studio`   | Open Prisma Studio                         |

## 📚 API Endpoints

### Health

- `GET /api/health` - Application health status
- `GET /api/health/db` - Database connection status

### Users

- `GET /api/users` - List all users (paginated)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/users/:id/activate` - Activate user
- `PATCH /api/users/:id/deactivate` - Deactivate user

## 🔧 Adding New Modules

To add a new feature module to the backend:

1. Create the module folder:

```bash
mkdir -p apps/backend/src/modules/your-module/dto
```

2. Create the module files:

- `your-module.module.ts`
- `your-module.controller.ts`
- `your-module.service.ts`
- `dto/create-your-module.dto.ts`
- `dto/update-your-module.dto.ts`

3. Register the module in `app.module.ts`

## 📄 License

MIT
