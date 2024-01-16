import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { UpdateOneUserModelArgs, UserModel } from '../../core/generated/prisma/graphql/user-model';
import { JwtAuthGuard } from '../auth/infrastructure/guard/jwt-auth.guard';
import { PubSubService } from '../pub-sub.service';
import { PUB_SUB_USER } from '../shared/domain/constants/pub-sub/user';
import { CurrentUser } from '../shared/infrastructure/decorators/get-user.decorator';
import { CustomCreateOneUserModelArgs } from './domain/dto/custom-create-one-user-model.args';
import { UserUpdatePasswordInput } from './domain/dto/user-update-password.input';
import { UserService } from './user.service';

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
  async createUser(@Args() args: CustomCreateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    return this.userService.create(args);
  }

  /**
   * Updates a user.
   * @param args The arguments for updating a user.
   * @returns A promise that resolves to the updated user or a GraphQLError.
   */
  @Mutation(() => UserModel)
  async updateUser(@Args() args: UpdateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    return this.userService.update(args);
  }

  /**
   * Retrieves the currently authenticated user.
   * @param user - The authenticated user.
   * @returns A Promise that resolves to the authenticated user or a GraphQLError.
   */
  @Query(() => UserModel)
  async me(@CurrentUser() user: UserModel): Promise<UserModel | GraphQLError> {
    return this.userService.me(user);
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
    @CurrentUser() user: UserModel,
  ): Promise<UserModel | GraphQLError> {
    return this.userService.updatePassword(user.id, data);
  }

  /**
   * Returns an async iterator that emits updates for the current user.
   * @returns A promise that resolves to an AsyncIterator of unknown values.
   */
  @Subscription(() => UserModel, {
    nullable: true,
    resolve: (payload: { [key: string]: UserModel }): UserModel => payload[PUB_SUB_USER.UPDATES],
  })
  async MeUpdates(): Promise<GraphQLError | AsyncIterator<unknown, unknown, undefined>> {
    return this.pubSub.asyncIterator(PUB_SUB_USER.UPDATES);
  }
}
