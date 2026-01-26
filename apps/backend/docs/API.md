# API Design Conventions

## REST API Standards

### URL Structure

```
/api/{version}/{resource}
/api/{version}/{resource}/{id}
/api/{version}/{resource}/{id}/{sub-resource}
```

Current API uses `/api` prefix without versioning. When versioning is needed:

```
/api/v1/users
/api/v2/users
```

### HTTP Methods

| Method | Usage                | Success Code   |
| ------ | -------------------- | -------------- |
| GET    | Retrieve resource(s) | 200 OK         |
| POST   | Create resource      | 201 Created    |
| PATCH  | Partial update       | 200 OK         |
| PUT    | Full replacement     | 200 OK         |
| DELETE | Remove resource      | 204 No Content |

### Response Format

All responses are wrapped by `TransformInterceptor`:

```json
{
  "success": true,
  "data": {
    /* actual response */
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "path": "/api/users",
    "method": "GET"
  }
}
```

### Pagination Response

```json
{
  "success": true,
  "data": {
    "data": [
      /* items */
    ],
    "meta": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

### Query Parameters

| Parameter   | Type     | Description              |
| ----------- | -------- | ------------------------ |
| `page`      | number   | Page number (1-indexed)  |
| `limit`     | number   | Items per page (max 100) |
| `sortBy`    | string   | Field to sort by         |
| `sortOrder` | asc/desc | Sort direction           |
| `search`    | string   | Search term              |

### Error Response

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users",
  "method": "POST"
}
```

### Status Codes

| Code | Meaning                        |
| ---- | ------------------------------ |
| 200  | Success                        |
| 201  | Created                        |
| 204  | No Content (successful delete) |
| 400  | Bad Request (validation error) |
| 401  | Unauthorized                   |
| 403  | Forbidden                      |
| 404  | Not Found                      |
| 409  | Conflict (duplicate)           |
| 500  | Internal Server Error          |

## Naming Conventions

### Endpoints

- Use plural nouns: `/users`, `/posts`, `/categories`
- Use kebab-case for multi-word: `/blog-posts`, `/user-profiles`
- Use IDs for specific resources: `/users/{id}`

### Request/Response Fields

- Use camelCase: `firstName`, `createdAt`, `userId`
- Boolean fields: `isActive`, `hasPermission`, `canEdit`
- Dates: ISO 8601 format: `2024-01-01T00:00:00.000Z`

## Authentication (Future)

When JWT auth is implemented:

```
Authorization: Bearer <token>
```

Protected endpoints return 401 if no/invalid token.
Role-protected endpoints return 403 if insufficient permissions.

## Rate Limiting

Default configuration (can be customized in `throttle.config.ts`):

- 100 requests per 60 seconds per IP

When exceeded:

```json
{
  "statusCode": 429,
  "message": "Too Many Requests"
}
```
