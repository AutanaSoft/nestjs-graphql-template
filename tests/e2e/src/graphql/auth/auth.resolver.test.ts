import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../../../../../src/app.module';

describe('Auth.Resolver', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('SignIn', () => {
    it('debe devolver un token', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query:
            'query SignIn($email: String!, $password: String!) {\r\n  signIn(email: $email, password: $password) {\r\n    token\r\n    createdAt\r\n    expiresAt\r\n  }\r\n}',
          variables: { email: 'speedleon@gmail.com', password: 'cardenas@1979' },
          operationName: 'SignIn',
        })
        .expect(200)
        .expect(response => {
          expect(response.status).toBe(200);
          expect(response.body.data.signIn.token).toBeDefined();
          expect(response.body.data.signIn.createdAt).toBeDefined();
          expect(response.body.data.signIn.expiresAt).toBeDefined();
        });
    });
  });
});
