import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDTO {
  @ApiProperty({
    description: 'JWT access token',
  })
  @Expose()
  token: string;

  @ApiProperty({
    description: 'Token type',
    example: 'Bearer',
    default: 'Bearer',
  })
  @Expose()
  tokenType?: string = 'Bearer';
}
