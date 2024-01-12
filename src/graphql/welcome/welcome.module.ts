import { Module } from '@nestjs/common';

import { WelcomeResolver } from './welcome.resolver';
import { WelcomeService } from './welcome.service';

@Module({
  providers: [WelcomeResolver, WelcomeService],
})
export class WelcomeModule {}
