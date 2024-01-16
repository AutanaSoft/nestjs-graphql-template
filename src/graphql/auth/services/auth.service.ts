import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { GraphQLError } from 'graphql'

import { ErrorService } from '../../../graphql/error.service'
import { hashField, verifyHashedField } from '../../shared/utils/hashField'
import { AccessToken } from '../domain/dto/access-token.dto '
import { SignInInput } from '../domain/dto/sign-in-input.dto'
import { SignUpInput } from '../domain/dto/sign-up-input.dto'
import { PrismaService } from './../../../prisma/prisma.service'
import { TokenService } from './token.service'

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name)
  private readonly userRepository: Prisma.UserModelDelegate<DefaultArgs>

  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly errorService: ErrorService,
  ) {
    this.userRepository = this.prisma.userModel
  }

  /**
   * Sign in a user with the provided credentials.
   * @param params - The sign-in input parameters.
   * @returns A promise that resolves to an AccessToken if the sign-in is successful, or a GraphQLError if the credentials are invalid.
   */
  async signIn(params: SignInInput): Promise<AccessToken | GraphQLError> {
    try {
      const { email, password } = params
      const user = await this.userRepository.findFirst({
        where: {
          OR: [
            {
              email: {
                equals: email,
                mode: 'insensitive',
              },
            },
            {
              userName: {
                equals: email,
                mode: 'insensitive',
              },
            },
          ],
        },
      })

      if (!user) {
        throw new GraphQLError('invalid Credentials', {
          extensions: {
            code: 'INVALID_CREDENTIALS',
            Status: HttpStatus.UNAUTHORIZED,
          },
        })
      }

      if (!verifyHashedField(password, user.password)) {
        throw new GraphQLError('Invalid credentials')
      }
      return this.tokenService.generateToken(user)
    } catch (error) {
      return this.errorService.set(error)
    }
  }

  /**
   * Signs up a user.
   * @param params - The sign up input parameters.
   * @returns A promise that resolves to an AccessToken or a GraphQLError.
   */
  async signUp(params: SignUpInput): Promise<AccessToken | GraphQLError> {
    try {
      if (params.password !== params.confirmPassword) {
        throw new GraphQLError('password and confirmPassword are not equal', {
          extensions: {
            code: 'PASSWORD_NOT_EQUAL',
            Status: HttpStatus.CONFLICT,
          },
        })
      }

      const exist = await this.userRepository.findFirst({
        where: {
          OR: [
            {
              email: {
                equals: params.email,
                mode: 'insensitive',
              },
            },
            {
              userName: {
                equals: params.userName,
                mode: 'insensitive',
              },
            },
          ],
        },
      })

      if (exist) {
        throw new GraphQLError('email or userName already exists', {
          extensions: {
            code: 'USER_ALREADY_EXISTS',
            Status: HttpStatus.CONFLICT,
          },
        })
      }

      delete params.confirmPassword
      const user = await this.userRepository.create({
        data: {
          ...params,
          password: hashField(params.password),
        },
      })
      return this.tokenService.generateToken(user)
    } catch (error) {
      return this.errorService.set(error)
    }
  }
}
