import { Module } from '@nestjs/common'

import { PrismaModule } from '../../prisma/prisma.module'
import { ErrorService } from '../shared/services/error.service'
import { PubSubService } from '../shared/services/pub-sub.service'
import { UserResolver } from './resolvers/user.resolver'
import { UserService } from './services/user.service'

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver, ErrorService, PubSubService],
  exports: [UserService],
})
export class UserModule {}
