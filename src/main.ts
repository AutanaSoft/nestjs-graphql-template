import fastifyCookie from '@fastify/cookie'
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  const configService = app.get(ConfigService)

  await app.register(fastifyCookie, {
    secret: configService.get<string>('APP_COOKIE_SECRET'),
    parseOptions: {},
  })

  app.enableCors({ origin: true, credentials: true })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  )

  const logger = new Logger('Main', { timestamp: false })

  const port = configService.get<string>('APP_PORT', '3000')

  await app.listen(port, '127.0.0.1', (err, address) => {
    if (err) {
      logger.error(err)
      process.exit(1)
    }
    logger.log(`Server ready at:  ${address} 🚀`)
    const graphqlPath = configService.get<string>('GRAPHQL_PATH', '/graphql')
    logger.log(`GraphQL ready at: ${address}${graphqlPath} 🚀`)
  })
}

bootstrap()
