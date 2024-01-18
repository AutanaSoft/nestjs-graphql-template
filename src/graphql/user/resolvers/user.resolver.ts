import { PUB_SUB_USER } from '@/graphql/shared/domain/constants/pub-sub/user'
import { User } from '@/graphql/shared/infrastructure/decorators/get-user.decorator'
import { JwtAuthGuard } from '@/graphql/shared/infrastructure/guard/jwt-auth.guard'
import { PubSubService } from '@/graphql/shared/services/pub-sub.service'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { CreateOneUserModelArgs } from '../domain/dto/create-one-user-model.args'
import { UpdateOneUserModelArgs } from '../domain/dto/update-one-user-model.args'
import { UserUpdatePasswordInput } from '../domain/dto/user-update-password.input'
import { UserModel } from '../domain/dto/user.model'
import { UserService } from '../services/user.service'
import { CheckRoles } from '@/graphql/shared/infrastructure/decorators/check-user-roles.decorator'
import { UserRoles } from '@prisma/client'

@UseGuards(JwtAuthGuard)
@Resolver(UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly pubSub: PubSubService,
  ) {}

  /**
   * Creates a new user.
   * @param args The arguments for creating the user.
   * @returns A promise that resolves to the created user or a GraphQLError.
   */
  @Mutation(() => UserModel)
  @CheckRoles(UserRoles.ADMIN)
  async createUser(
    @Args() args: CreateOneUserModelArgs,
  ): Promise<UserModel | GraphQLError> {
    return this.userService.create(args)
  }

  /**
   * Updates a user.
   * @param args The arguments for updating a user.
   * @returns A promise that resolves to the updated user or a GraphQLError.
   */
  @Mutation(() => UserModel)
  async updateUser(
    @Args() args: UpdateOneUserModelArgs,
  ): Promise<UserModel | GraphQLError> {
    return this.userService.update(args)
  }

  /**
   * Retrieves the currently authenticated user.
   * @param user - The authenticated user.
   * @returns A Promise that resolves to the authenticated user or a GraphQLError.
   */
  @Query(() => UserModel)
  async me(@User() user: UserModel): Promise<UserModel | GraphQLError> {
    return this.userService.me(user)
  }

  /**
   * Updates the password of a user.
   * @param data - The input data containing the new password.
   * @param user - The current user making the request.
   * @returns A Promise that resolves to the updated user model or a GraphQLError.
   */
  @Mutation(() => UserModel)
  async updatePassword(
    @Args('data') data: UserUpdatePasswordInput,
    @User() user: UserModel,
  ): Promise<UserModel | GraphQLError> {
    return this.userService.updatePassword(user.id, data)
  }

  /**
   * Returns an async iterator that emits updates for the current user.
   * @returns A promise that resolves to an AsyncIterator of unknown values.
   */
  @Subscription(() => UserModel, {
    nullable: true,
    resolve: (payload: { [key: string]: UserModel }): UserModel =>
      payload[PUB_SUB_USER.UPDATES],
  })
  async MeUpdates(): Promise<
    GraphQLError | AsyncIterator<unknown, unknown, undefined>
  > {
    return this.pubSub.asyncIterator(PUB_SUB_USER.UPDATES)
  }
}
