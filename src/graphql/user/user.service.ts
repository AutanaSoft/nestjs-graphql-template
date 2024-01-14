import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma, UserModel } from '@prisma/client';
import { GraphQLError } from 'graphql';

import {
  CreateOneUserModelArgs,
  FindUniqueUserModelArgs,
  UpdateOneUserModelArgs,
} from '../../core/graphql/generated/user-model';
import { hashField } from '../../core/utils/hashField';
import { PrismaService } from '../../prisma/prisma.service';
import { ErrorService } from '../error.service';
import { PubSubService } from '../pub-sub.service';
import { PUB_SUB_USER } from '../shared/domain/constants/pub-sub/user';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly repository: Prisma.UserModelDelegate;

  constructor(
    private readonly prisma: PrismaService,
    private readonly errorService: ErrorService,
    private readonly pubSub: PubSubService,
  ) {
    this.repository = this.prisma.userModel;
  }

  async create(params: CreateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    try {
      const exist = await this.repository.findFirst({
        where: {
          OR: [
            {
              email: {
                equals: params.data.email,
                mode: 'insensitive',
              },
            },
            {
              userName: {
                equals: params.data.userName,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      if (exist) {
        throw new GraphQLError('El email o usuario ya existe', {
          extensions: {
            code: 'EMAIL_OR_USERNAME_ALREADY_EXISTS',
            status: HttpStatus.CONFLICT,
          },
        });
      }
      params.data.password = hashField(params.data.password);
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
      if (params.data.password) {
        params.data.password = hashField(params.data.password);
      }
      const update = await this.repository.update(params);
      await this.pubSub.publish(PUB_SUB_USER.UPDATES, { [PUB_SUB_USER.UPDATES]: update });
      return update;
    } catch (error) {
      return this.errorService.set(error);
    }
  }
}
