import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  CreateOneUserModelArgs,
  FindUniqueUserModelArgs,
  UpdateOneUserModelArgs,
  UserModel,
} from '../../core/graphql/generated/user-model';
import { hashField } from '../../core/utils/hashField';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly repository: Prisma.UserModelDelegate;

  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly prisma: PrismaService,
  ) {
    this.repository = this.prisma.userModel;
  }

  async create(params: CreateOneUserModelArgs): Promise<UserModel> {
    try {
      if (params.data.password) {
        params.data.password = hashField(params.data.password);
      }
      return await this.repository.create(params);
    } catch (error) {
      throw error;
    }
  }

  async find(params: FindUniqueUserModelArgs): Promise<UserModel | null> {
    try {
      return await this.repository.findUnique(params);
    } catch (error) {
      throw error;
    }
  }

  async update(params: UpdateOneUserModelArgs): Promise<UserModel> {
    try {
      this.logger.log(params.data.userName);
      return await this.repository.update(params);
    } catch (error) {
      throw error;
    }
  }
}
