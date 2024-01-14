import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { WelcomeModule } from './welcome/welcome.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => ({
        path: config.get<string>('GRAPHQL_PATH'),
        debug: config.get<boolean>('GRAPHQL_DEBUG'),
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
        sortSchema: true,
        context: ({ req }) => ({ req }),
        subscriptions: {
          'graphql-ws': true,
        },
      }),
      inject: [ConfigService],
    }),
    WelcomeModule,
    UserModule,
  ],
  providers: [],
  exports: [],
})
export class GraphqlModule {}
