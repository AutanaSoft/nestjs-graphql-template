import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from './core/logger/logger.module';
import { MainModule } from './core/main/main.module';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local', '.env'], cache: true }),
    LoggerModule,
    MainModule,
    GraphqlModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
