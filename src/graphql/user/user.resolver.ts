import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import {
  CreateOneUserModelArgs,
  UpdateOneUserModelArgs,
  UserModel,
} from '../../core/generated/prisma/graphql/user-model';
import { PubSubService } from '../pub-sub.service';
import { PUB_SUB_USER } from '../shared/domain/constants/pub-sub/user';
import { UserService } from './user.service';

@Resolver(UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly pubSub: PubSubService,
  ) {}

  @Mutation(() => UserModel)
  async createUser(@Args() args: CreateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    return this.userService.create(args);
  }

  @Mutation(() => UserModel)
  async updateUser(@Args() args: UpdateOneUserModelArgs): Promise<UserModel | GraphQLError> {
    return this.userService.update(args);
  }

  @Subscription(() => UserModel, {
    nullable: true,
    resolve: (payload: { [key: string]: UserModel }): UserModel => payload[PUB_SUB_USER.UPDATES],
  })
  MeUpdates(): GraphQLError | AsyncIterator<unknown, unknown, undefined> {
    return this.pubSub.asyncIterator(PUB_SUB_USER.UPDATES);
  }
}
