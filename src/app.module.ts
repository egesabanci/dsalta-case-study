import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@dsalta-case/auth';
import { AuthGuard } from '@dsalta-case/guards';
import { TaskModule } from '@dsalta-case/task';

import { config } from '../ormconfig';

const modules = [
  TypeOrmModule.forRoot({ ...config }),
  ConfigModule.forRoot({ isGlobal: true }),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
  }),

  AuthModule,
  TaskModule,
];

const providers = [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
];

@Module({
  imports: [...modules],
  providers: [...providers],
})
export class AppModule {}
