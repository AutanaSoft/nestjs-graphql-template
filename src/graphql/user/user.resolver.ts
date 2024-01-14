import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateOneUserArgs, UpdateOneUserArgs, User } from '../../core/graphql/generated/user';
import { UserService } from './user.service';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args() args: CreateOneUserArgs): Promise<User> {
    return this.userService.create(args);
  }

  @Mutation(() => User)
  async updateUser(@Args() args: UpdateOneUserArgs): Promise<User> {
    return this.userService.update(args);
  }
}
