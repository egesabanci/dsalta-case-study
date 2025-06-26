import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from 'ormconfig';

import { AppController } from './app.controller';

const controllers = [AppController];

const modules = [TypeOrmModule.forRoot({ ...config })];

const providers = [];

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...providers],
})
export class AppModule {}
