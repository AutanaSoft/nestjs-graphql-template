import { Args, Query, Resolver } from '@nestjs/graphql';

import { WelcomeService } from './welcome.service';

@Resolver()
export class WelcomeResolver {
  constructor(private readonly welcomeService: WelcomeService) {}

  @Query(() => String)
  async getHello(@Args('name') name: string) {
    return this.welcomeService.getHello(name);
  }
}
