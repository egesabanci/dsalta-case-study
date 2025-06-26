import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from '@dsalta-case/auth';
import { AuthGuard } from '@dsalta-case/guards';
import { TaskModule } from '@dsalta-case/task';

import { config } from '../ormconfig';

const modules = [
  TypeOrmModule.forRoot({ ...config }),
  ConfigModule.forRoot({ isGlobal: true }),
  CacheModule.register({ isGlobal: true }),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
  }),
  ThrottlerModule.forRoot([
    {
      ttl: 60_000,
      limit: 10,
    },
  ]),

  AuthModule,
  TaskModule,
];

const providers = [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
];

@Module({
  imports: [...modules],
  providers: [...providers],
})
export class AppModule {}
