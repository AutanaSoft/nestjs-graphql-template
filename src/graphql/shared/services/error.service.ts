import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'
import { GraphQLError } from 'graphql'

@Injectable()
export class ErrorService {
  private readonly logger = new Logger(ErrorService.name)

  constructor() {}

  /**
   * Converts an error to a GraphQLError object.
   * @param error - The error to convert.
   * @returns The converted GraphQLError object.
   */
  set(error: Error): GraphQLError {
    if (error instanceof GraphQLError) return error

    if (error instanceof PrismaClientKnownRequestError) {
      return new GraphQLError(error.message.replace('Entity', ''), {
        extensions: {
          status: 'KNOWN_REQUEST_ERROR',
          code: error.code,
          arguments: error.meta ?? error.name,
          errors: error,
        },
      })
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      return new GraphQLError(error.message.replace('Entity', ''), {
        extensions: {
          status: 'UNKNOWN_REQUEST_ERROR',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          arguments: error.name,
          errors: error,
        },
      })
    }

    if (error instanceof PrismaClientValidationError) {
      return new GraphQLError(error.message.replace('Entity', ''), {
        extensions: {
          status: 'VALIDATION_ERRO',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          arguments: error.name,
          errors: error,
        },
      })
    }

    this.logger.log(error.message)

    return new GraphQLError(error.message, {
      extensions: {
        status: 'INTERNAL_SERVER_ERROR 11',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        arguments: error.name,
        errors: error,
      },
    })
  }
}
