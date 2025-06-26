import { AuthRequestDTO, AuthResponseDTO } from '../dto';

export interface IAuthController {
  login(payload: AuthRequestDTO): Promise<AuthResponseDTO>;
  signup(payload: AuthRequestDTO): Promise<AuthResponseDTO>;
}
