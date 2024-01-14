import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { verifyHashedField } from '../../../core/utils/hashField';
import { ErrorService } from '../../../graphql/error.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { SignInInput } from '../dto/sign-in-input.dto';
import { SignUpInput } from '../dto/sign-up-input.dto';
import { AccessToken } from '../dto/token-payload.dto';
import { UserService } from './../../user/user.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly errorService: ErrorService,
    private readonly userService: UserService,
  ) {}

  async signIn(params: SignInInput): Promise<AccessToken | GraphQLError> {
    try {
      const { email, password } = params;

      const user = await this.userService.find({
        where: {
          email: email,
        },
      });

      if (user instanceof GraphQLError) {
        throw user;
      }

      if (!verifyHashedField(password, user.password)) {
        throw new GraphQLError('Invalid credentials');
      }

      return this.tokenService.generateToken(user);
    } catch (error) {
      return this.errorService.set(error);
    }
  }

  async signUp(params: SignUpInput): Promise<AccessToken | GraphQLError> {
    try {
      const user = await this.userService.create({
        data: params,
      });

      if (user instanceof GraphQLError) {
        throw user;
      }

      return this.tokenService.generateToken(user);
    } catch (error) {
      return this.errorService.set(error);
    }
  }
}
