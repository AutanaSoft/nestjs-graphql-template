import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, UserModel } from '@prisma/client';

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

  async create(params: Prisma.UserModelCreateArgs): Promise<UserModel> {
    try {
      if (params.data.password) {
        params.data.password = hashField(params.data.password);
      }
      return await this.repository.create(params);
    } catch (error) {
      throw error;
    }
  }

  async find(params: Prisma.UserModelFindUniqueArgs): Promise<UserModel | null> {
    try {
      return await this.repository.findUnique(params);
    } catch (error) {
      throw error;
    }
  }

  async update(params: Prisma.UserModelUpdateArgs): Promise<UserModel> {
    try {
      this.logger.log(params.data.userName);
      return await this.repository.update(params);
    } catch (error) {
      throw error;
    }
  }
}
