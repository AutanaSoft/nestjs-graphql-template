import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import {
  CreateOneUserModelArgs,
  UpdateOneUserModelArgs,
  UserModel,
} from '../../core/graphql/generated/user-model';
import { UserService } from './user.service';

@Resolver(UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(@Args() args: CreateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    return this.userService.create(args);
  }

  @Mutation(() => UserModel)
  async updateUser(@Args() args: UpdateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    return this.userService.update(args);
  }
}
