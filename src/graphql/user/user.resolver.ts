import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateOneUserModelArgs } from '../../core/graphql/generated/user-model/create-one-user-model.args';
import { UpdateOneUserModelArgs } from '../../core/graphql/generated/user-model/update-one-user-model.args';
import { UserModel } from '../../core/graphql/generated/user-model/user-model.model';
import { UserService } from './user.service';

@Resolver(UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(@Args() args: CreateOneUserModelArgs): Promise<UserModel> {
    return this.userService.create(args);
  }

  @Mutation(() => UserModel)
  async updateUser(@Args() args: UpdateOneUserModelArgs): Promise<UserModel> {
    return this.userService.update(args);
  }
}
