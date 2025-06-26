import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities';

const modules = [TypeOrmModule.forFeature([User])];

const providers = [AuthService];

const controllers = [AuthController];

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...providers],
  exports: [...providers],
})
export class AuthModule {}
