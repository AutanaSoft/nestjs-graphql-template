import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly repository: Prisma.UserDelegate;

  constructor(private readonly prisma: PrismaService) {
    this.repository = prisma.user;
  }

  async create(params: Prisma.UserCreateArgs): Promise<User> {
    try {
      return await this.repository.create(params);
    } catch (error) {
      throw error;
    }
  }

  async find(params: Prisma.UserFindUniqueArgs): Promise<User | null> {
    try {
      return await this.repository.findUnique(params);
    } catch (error) {
      throw error;
    }
  }

  async update(params: Prisma.UserUpdateArgs): Promise<User> {
    try {
      return await this.repository.update(params);
    } catch (error) {
      throw error;
    }
  }
}
