import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MainModule } from './core/main/main.module';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      cache: true,
    }),
    MainModule,
    PrismaModule,
    GraphqlModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
