import {
  Post,
  Body,
  HttpCode,
  Controller,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { IAuthController } from './interfaces';
import { AuthRequestDTO, AuthResponseDTO } from './dto';

import { Public } from '@dsalta-case/decorators';

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and return access token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
    type: AuthResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  public async login(
    @Body() payload: AuthRequestDTO,
  ): Promise<AuthResponseDTO> {
    return this.authService.login(payload);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user and return access token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: AuthResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  public async signup(
    @Body() payload: AuthRequestDTO,
  ): Promise<AuthResponseDTO> {
    return this.authService.signup(payload);
  }
}
