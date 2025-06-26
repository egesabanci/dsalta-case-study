import {
  Post,
  Body,
  HttpCode,
  Controller,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { IAuthController } from './interfaces';
import { AuthRequestDTO, AuthResponseDTO } from './dto';

import { Public } from '@dsalta-case/decorators';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() payload: AuthRequestDTO,
  ): Promise<AuthResponseDTO> {
    return this.authService.login(payload);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(
    @Body() payload: AuthRequestDTO,
  ): Promise<AuthResponseDTO> {
    return this.authService.signup(payload);
  }
}
