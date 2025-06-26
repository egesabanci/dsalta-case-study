import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '@dsalta-case/guards';

import { AuthModule } from '@dsalta-case/auth';

import { config } from '../ormconfig';

const modules = [
  TypeOrmModule.forRoot({ ...config }),
  ConfigModule.forRoot({ isGlobal: true }),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
  }),

  AuthModule,
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
