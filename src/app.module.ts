import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GraphqlModule } from './graphql/graphql.module';
import { MainModule } from './main/main.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
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
