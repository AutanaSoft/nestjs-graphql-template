import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../../src/app.module';

describe('Main', () => {
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

  it('/GET main', () => {
    return request(app.getHttpServer()).get('/main').expect(200).expect({ status: 'ok' });
  });

  it('/POST welcome', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 'query Query($name: String!) {\r\n  getHello(name: $name)\r\n}',
        variables: { name: 'Leandro Cardenas' },
        operationName: 'Query',
      })
      .expect(200);
  });
});
