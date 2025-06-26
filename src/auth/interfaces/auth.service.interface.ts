import { AuthRequestDTO, AuthResponseDTO } from '../dto';

export interface IAuthService {
	login(payload: AuthRequestDTO): Promise<AuthResponseDTO>;
	signup(payload: AuthRequestDTO): Promise<AuthResponseDTO>;
	validate(email: string, password: string): Promise<boolean>;
}
