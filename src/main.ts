import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Knex from 'knex';
import { Model } from 'objection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Knex binding
  const knexConfig = require('../knexfile');
  const knex = Knex(knexConfig.default)
  Model.knex(knex);

  await app.listen(3000);
}

bootstrap();
