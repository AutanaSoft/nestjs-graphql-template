import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateOneUserArgs, UpdateOneUserArgs, User } from '../generated/user';
import { UserService } from './user.service';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args() params: CreateOneUserArgs): Promise<User> {
    return this.userService.create(params);
  }

  @Mutation(() => User)
  async updateUser(@Args() args: UpdateOneUserArgs): Promise<User> {
    return this.userService.update(args);
  }
}
