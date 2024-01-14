import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';

import {
  CreateOneUserModelArgs,
  FindUniqueUserModelArgs,
  UpdateOneUserModelArgs,
  UserModel,
} from '../../core/graphql/generated/user-model';
import { hashField } from '../../core/utils/hashField';
import { PrismaService } from '../../prisma/prisma.service';
import { ErrorService } from '../error.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly repository: Prisma.UserModelDelegate;

  constructor(
    private readonly prisma: PrismaService,
    private readonly errorService: ErrorService,
  ) {
    this.repository = this.prisma.userModel;
  }

  async create(params: CreateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    try {
      if (params.data.password) {
        params.data.password = hashField(params.data.password);
      }
      return await this.repository.create(params);
    } catch (error) {
      return this.errorService.set(error);
    }
  }

  async find(params: FindUniqueUserModelArgs): Promise<UserModel | GraphQLError> {
    try {
      return await this.repository.findUnique(params);
    } catch (error) {
      return this.errorService.set(error);
    }
  }

  async update(params: UpdateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    try {
      this.logger.log(params.data.userName);
      return await this.repository.update(params);
    } catch (error) {
      return this.errorService.set(error);
    }
  }
}
