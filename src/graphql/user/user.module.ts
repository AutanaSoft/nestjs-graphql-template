import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { ErrorService } from '../error.service';
import { PubSubService } from '../pub-sub.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver, ErrorService, PubSubService],
  exports: [UserService],
})
export class UserModule {}
