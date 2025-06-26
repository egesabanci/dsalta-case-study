import { Expose } from 'class-transformer';

export class AuthResponseDTO {
  @Expose()
  token: string;

  @Expose()
  tokenType?: string = 'Bearer';
}
