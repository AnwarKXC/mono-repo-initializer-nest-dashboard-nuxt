import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto, UpdateUserDto, FindUsersDto } from './dto';
import { paginate, PaginatedResult } from '../../shared';
import { User, Prisma } from '../../generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(findUsersDto: FindUsersDto): Promise<PaginatedResult<User>> {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = findUsersDto;

    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role as Prisma.EnumRoleFilter['equals'];
    }

    const skip = (page - 1) * limit;
    const take = limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          avatar: true,
          isActive: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return paginate(users as unknown as User[], total, page, limit);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<User> {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async deactivate(id: string): Promise<User> {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async activate(id: string): Promise<User> {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: { isActive: true },
    });
  }
}
