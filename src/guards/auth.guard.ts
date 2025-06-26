import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { IS_PUBLIC_KEY } from '@dsalta-case/decorators';

import { AuthError } from '@dsalta-case/common/errors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    if (!authHeader) {
      throw new AuthError.MissingAuthorizationHeaderException();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AuthError.MissingBearerTokenException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
      return true;
    } catch {
      throw new AuthError.InvalidTokenException();
    }
  }
}
