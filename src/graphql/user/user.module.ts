import { Module } from '@nestjs/common';

import { LoggerModule } from '../../core/logger/logger.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, LoggerModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
