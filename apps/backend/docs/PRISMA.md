# Prisma Database Guide

## Schema Location

Main schema: `prisma/schema.prisma`

## Quick Commands

```bash
# Generate Prisma Client after schema changes
pnpm prisma generate

# Create and apply migrations
pnpm prisma migrate dev --name migration_name

# Apply migrations in production
pnpm prisma migrate deploy

# Reset database (development only)
pnpm prisma migrate reset

# Open Prisma Studio
pnpm prisma studio

# Format schema
pnpm prisma format
```

## Schema Conventions

### Model Naming

- PascalCase for models: `User`, `BlogPost`, `UserProfile`
- Use `@@map("table_name")` for snake_case table names:

```prisma
model User {
  id String @id @default(cuid())
  // ...
  @@map("users")
}
```

### Field Naming

- camelCase in schema: `firstName`, `createdAt`
- Use `@map("column_name")` for snake_case columns:

```prisma
model User {
  firstName String? @map("first_name")
  createdAt DateTime @default(now()) @map("created_at")
}
```

### IDs

Use CUID for primary keys:

```prisma
id String @id @default(cuid())
```

### Timestamps

Include on all models:

```prisma
createdAt DateTime @default(now()) @map("created_at")
updatedAt DateTime @updatedAt @map("updated_at")
```

### Relations

```prisma
// One-to-Many
model User {
  id    String @id @default(cuid())
  posts Post[]
}

model Post {
  id       String @id @default(cuid())
  authorId String @map("author_id")
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([authorId])
}

// Many-to-Many
model Post {
  id   String     @id @default(cuid())
  tags Tag[]      @relation("PostToTag")
}

model Tag {
  id    String @id @default(cuid())
  posts Post[] @relation("PostToTag")
}
```

### Enums

```prisma
enum Role {
  USER
  ADMIN
  MODERATOR
}

model User {
  role Role @default(USER)
}
```

## Using Prisma in Services

### Basic CRUD

```typescript
// Create
await this.prisma.user.create({
  data: { email, password, firstName },
});

// Read one
await this.prisma.user.findUnique({
  where: { id },
});

// Read many with pagination
await this.prisma.user.findMany({
  where: { isActive: true },
  skip: 0,
  take: 10,
  orderBy: { createdAt: 'desc' },
});

// Update
await this.prisma.user.update({
  where: { id },
  data: { firstName: 'New Name' },
});

// Delete
await this.prisma.user.delete({
  where: { id },
});
```

### Relations

```typescript
// Include relations
await this.prisma.user.findUnique({
  where: { id },
  include: {
    posts: true,
    profile: true,
  },
});

// Select specific fields
await this.prisma.user.findMany({
  select: {
    id: true,
    email: true,
    posts: {
      select: { title: true },
    },
  },
});
```

### Transactions

```typescript
await this.prisma.$transaction([
  this.prisma.user.update({
    where: { id: 1 },
    data: { balance: { decrement: 100 } },
  }),
  this.prisma.user.update({
    where: { id: 2 },
    data: { balance: { increment: 100 } },
  }),
]);
```

## Current Schema Models

| Model    | Description             |
| -------- | ----------------------- |
| User     | User accounts with auth |
| Profile  | Extended user info      |
| Post     | Blog/content posts      |
| Category | Post categories         |
| Tag      | Post tags               |
| Session  | User sessions           |

See `prisma/schema.prisma` for full schema definition.
