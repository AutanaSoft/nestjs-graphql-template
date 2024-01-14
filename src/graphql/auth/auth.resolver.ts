import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { SignInInput } from './dto/sign-in-input.dto';
import { SignUpInput } from './dto/sign-up-input.dto';
import { AccessToken } from './dto/token-payload.dto';
import { AuthService } from './services/auth.service';

@Resolver(AccessToken)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AccessToken)
  async signIn(@Args() input: SignInInput): Promise<AccessToken | GraphQLError> {
    return this.authService.signIn(input);
  }

  @Mutation(() => AccessToken)
  async signUp(@Args() input: SignUpInput): Promise<AccessToken | GraphQLError> {
    return this.authService.signUp(input);
  }
}
