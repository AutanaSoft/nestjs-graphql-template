import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '../../../../../src/app.module'

describe('Auth.Resolver', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    )
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('SignIn', () => {
    it('has to return invalid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query:
            'query SignIn($email: String!, $password: String!) {\r\n  signIn(email: $email, password: $password) {\r\n    token\r\n    createdAt\r\n    expiresAt\r\n  }\r\n}',
          variables: { email: 'test@domain.com', password: 'testPassword' },
          operationName: 'SignIn',
        })
        .expect(200)
      const { body } = response
      expect(body.errors).toBeDefined()
      expect(body.errors[0].message).toBe('invalid Credentials')
      expect(body.errors[0].path[0]).toBe('signIn')
      expect(body.errors[0].extensions.code).toBe('INVALID_CREDENTIALS')
      expect(body.errors[0].extensions.Status).toBe(401)
    })
  })
})
