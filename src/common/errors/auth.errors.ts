import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from './error.base';

export class UserAlreadyExistsException extends BaseHttpException {
  constructor() {
    super(
      'UserAlreadyExists',
      'Conflict',
      'A user already exists with this email address',
      HttpStatus.CONFLICT,
    );
  }
}

export class InvalidCredentialsException extends BaseHttpException {
  constructor() {
    super(
      'InvalidCredentials',
      'Unauthorized',
      'Invalid credentials',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class UserNotFoundException extends BaseHttpException {
  constructor() {
    super('UserNotFound', 'Not Found', 'User not found', HttpStatus.NOT_FOUND);
  }
}

export class InvalidTokenException extends BaseHttpException {
  constructor() {
    super(
      'InvalidToken',
      'Unauthorized',
      'Invalid token',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class MissingAuthorizationHeaderException extends BaseHttpException {
  constructor() {
    super(
      'MissingAuthorizationHeader',
      'Unauthorized',
      'Missing authorization header',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class MissingBearerTokenException extends BaseHttpException {
  constructor() {
    super(
      'MissingBearerToken',
      'Unauthorized',
      'Missing bearer token',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
