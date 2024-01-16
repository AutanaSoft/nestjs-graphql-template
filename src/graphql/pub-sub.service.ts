import { Injectable } from '@nestjs/common'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'

import { ErrorService } from './error.service'

@Injectable()
export class PubSubService {
  private pubSub: PubSub

  constructor(private readonly processError: ErrorService) {
    this.pubSub = new PubSub()
  }

  async publish(
    triggerName: string,
    payload: Record<string, unknown>,
  ): Promise<void | GraphQLError | AsyncIterator<never>> {
    try {
      await this.pubSub.publish(triggerName, payload)
    } catch (error) {
      return this.processError.set(error)
    }
  }

  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> | GraphQLError {
    try {
      return this.pubSub.asyncIterator<T>(triggers)
    } catch (error) {
      return this.processError.set(error)
    }
  }
}
