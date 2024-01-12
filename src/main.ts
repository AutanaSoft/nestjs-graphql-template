import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const configService = app.get(ConfigService);
  const port = configService.get<string>('APP_PORT', '3000');

  const logger = app.get(Logger);

  await app.listen(port, '127.0.0.1', (err, address) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.log(`Server ready at:  ${address} 🚀`);
    const graphqlPath = configService.get<string>('GRAPHQL_PATH', '/graphql');
    logger.log(`GraphQL ready at: ${address}${graphqlPath} 🚀`);
  });
}
bootstrap();
