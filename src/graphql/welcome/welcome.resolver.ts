import { Query, Resolver } from '@nestjs/graphql';

import { WelcomeService } from './welcome.service';

@Resolver()
export class WelcomeResolver {
  constructor(private readonly welcomeService: WelcomeService) {}

  @Query(() => String)
  async getHello() {
    return this.welcomeService.getHello();
  }
}
