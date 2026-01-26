# NestJS Development Conventions

## Module Organization

### Feature Modules

Each feature should be a self-contained module in `src/modules/{feature}/`:

```typescript
// {feature}.module.ts
@Module({
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [FeatureService], // Export if used by other modules
})
export class FeatureModule {}
```

### Creating a New Module

1. Create folder structure:

   ```
   src/modules/{feature}/
   ├── dto/
   │   ├── create-{feature}.dto.ts
   │   ├── update-{feature}.dto.ts
   │   └── index.ts
   ├── {feature}.controller.ts
   ├── {feature}.service.ts
   ├── {feature}.module.ts
   └── index.ts
   ```

2. Register in `app.module.ts`:
   ```typescript
   imports: [
     // ... other modules
     FeatureModule,
   ];
   ```

## Controllers

### Route Naming

```typescript
@Controller('resources') // Plural noun
export class ResourceController {
  @Get()           // GET /api/resources
  @Get(':id')      // GET /api/resources/:id
  @Post()          // POST /api/resources
  @Patch(':id')    // PATCH /api/resources/:id
  @Delete(':id')   // DELETE /api/resources/:id
}
```

### Response Status Codes

```typescript
@Post()
@HttpCode(HttpStatus.CREATED)  // 201 for create
create() {}

@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)  // 204 for delete
remove() {}
```

## Services

### Dependency Injection

```typescript
@Injectable()
export class FeatureService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}
}
```

### Error Handling

Use NestJS built-in exceptions:

```typescript
throw new NotFoundException(`Resource with ID ${id} not found`);
throw new ConflictException('Resource already exists');
throw new BadRequestException('Invalid input');
throw new UnauthorizedException('Not authenticated');
throw new ForbiddenException('Not authorized');
```

## DTOs

### Validation

```typescript
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.USER;
}
```

### Transformation

```typescript
import { Type, Transform } from 'class-transformer';

export class QueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Transform(({ value }) => value?.toLowerCase())
  @IsString()
  search?: string;
}
```

## Configuration

### Typed Configuration

```typescript
// src/config/feature.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('feature', () => ({
  apiKey: process.env.FEATURE_API_KEY,
  timeout: parseInt(process.env.FEATURE_TIMEOUT, 10) || 5000,
}));
```

### Using Configuration

```typescript
constructor(private configService: ConfigService) {}

someMethod() {
  const apiKey = this.configService.get<string>('feature.apiKey');
}
```

## Testing

### Unit Tests

```typescript
describe('FeatureService', () => {
  let service: FeatureService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FeatureService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<FeatureService>(FeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

## Common Patterns

### Pagination

Use `PaginationDto` from shared:

```typescript
import { PaginationDto } from '../../shared/dto';

async findAll(paginationDto: PaginationDto) {
  const { page, limit } = paginationDto;
  const skip = (page - 1) * limit;
  // ...
}
```

### Guards & Decorators

```typescript
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
@Get('admin-only')
adminEndpoint() {}

@Public()  // Skip auth
@Get('public')
publicEndpoint() {}
```
