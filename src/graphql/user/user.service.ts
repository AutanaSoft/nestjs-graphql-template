import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Prisma, UserModel } from '@prisma/client'
import { GraphQLError } from 'graphql'

import {
  FindUniqueUserModelArgs,
  UpdateOneUserModelArgs,
} from '../../core/generated/prisma/graphql/user-model'
import { PrismaService } from '../../prisma/prisma.service'
import { ErrorService } from '../error.service'
import { PubSubService } from '../pub-sub.service'
import { PUB_SUB_USER } from '../shared/domain/constants/pub-sub/user'
import { hashField } from '../shared/utils/hashField'
import { CustomCreateOneUserModelArgs } from './domain/dto/custom-create-one-user-model.args'
import { UserUpdatePasswordInput } from './domain/dto/user-update-password.input'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  private readonly repository: Prisma.UserModelDelegate

  constructor(
    private readonly prisma: PrismaService,
    private readonly errorService: ErrorService,
    private readonly pubSub: PubSubService,
  ) {
    this.repository = this.prisma.userModel
  }

  /**
   * Creates a new user.
   * @param params - The parameters for creating the user.
   * @returns A promise that resolves to the created user or a GraphQLError.
   */
  async create(params: CustomCreateOneUserModelArgs): Promise<UserModel | GraphQLError> {
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
      })

      if (params.data.password !== params.data.confirmPassword) {
        throw new GraphQLError('password and confirmPassword are not equal', {
          extensions: {
            code: 'PASSWORD_NOT_EQUAL',
            Status: HttpStatus.CONFLICT,
          },
        })
      }

      // delete params.data.confirmPassword;
      delete params.data.confirmPassword

      if (exist) {
        throw new GraphQLError('email or username already exists', {
          extensions: {
            code: 'EMAIL_OR_USERNAME_ALREADY_EXISTS',
            status: HttpStatus.CONFLICT,
          },
        })
      }
      params.data.password = hashField(params.data.password)
      return await this.repository.create(params)
    } catch (error) {
      return this.errorService.set(error)
    }
  }

  /**
   * Finds a user based on the provided parameters.
   * @param params - The parameters used to find the user.
   * @returns A promise that resolves to the found user or a GraphQLError if an error occurs.
   */
  async find(params: FindUniqueUserModelArgs): Promise<UserModel | GraphQLError> {
    try {
      return await this.repository.findUnique(params)
    } catch (error) {
      return this.errorService.set(error)
    }
  }

  /**
   * Updates a user based on the provided parameters.
   * If the password is provided in the parameters, it will be hashed before updating.
   * Publishes the update event using PubSub.
   * @param params - The parameters for updating the user.
   * @returns A Promise that resolves to the updated user or a GraphQLError if an error occurs.
   */
  async update(params: UpdateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    try {
      if (params.data.password) {
        params.data.password = hashField(params.data.password)
      }
      const update = await this.repository.update(params)
      await this.pubSub.publish(PUB_SUB_USER.UPDATES, { [PUB_SUB_USER.UPDATES]: update })
      return update
    } catch (error) {
      return this.errorService.set(error)
    }
  }

  /**
   * Updates the password of a user.
   * @param id - The ID of the user.
   * @param params - The parameters for updating the password.
   * @returns A promise that resolves to the updated user model or a GraphQLError.
   */
  async updatePassword(
    id: string,
    params: UserUpdatePasswordInput,
  ): Promise<UserModel | GraphQLError> {
    try {
      const { oldPassword, newPassword } = params
      const user = await this.repository.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        throw new GraphQLError('user not found', {
          extensions: {
            code: 'USER_NOT_FOUND',
            status: HttpStatus.NOT_FOUND,
          },
        })
      }

      if (user.password !== hashField(oldPassword)) {
        throw new GraphQLError('old password is incorrect', {
          extensions: {
            code: 'OLD_PASSWORD_INCORRECT',
            status: HttpStatus.BAD_REQUEST,
          },
        })
      }

      return await this.repository.update({
        where: {
          id: id,
        },
        data: {
          password: hashField(newPassword),
        },
      })
    } catch (error) {
      return this.errorService.set(error)
    }
  }

  /**
   * Retrieves the user information for the authenticated user.
   * @param user - The authenticated user.
   * @returns A promise that resolves to the user information or a GraphQLError if an error occurs.
   */
  async me(user: UserModel): Promise<UserModel | GraphQLError> {
    try {
      const { id } = user
      return await this.repository.findUnique({
        where: {
          id,
        },
      })
    } catch (error) {
      return this.errorService.set(error)
    }
  }
}
