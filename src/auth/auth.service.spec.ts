import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { AuthRequestDTO } from './dto';
import { User } from './entities';

import { AuthError } from '../errors';

jest.mock('bcrypt');
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthService', () => {
	let service: AuthService;
	let userRepository: jest.Mocked<Repository<User>>;
	let jwtService: jest.Mocked<JwtService>;

	const mockUser: User = {
		id: '123e4567-e89b-12d3-a456-426614174000',
		email: 'test@email.com',
		password: 'hashedPassword',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockAuthRequest: AuthRequestDTO = {
		email: 'test@email.com',
		password: 'plainPassword',
	};

	const mockToken = 'jwt-token';

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: getRepositoryToken(User),
					useValue: {
						findOne: jest.fn(),
						create: jest.fn(),
						save: jest.fn(),
					},
				},
				{
					provide: JwtService,
					useValue: {
						signAsync: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		userRepository = module.get(getRepositoryToken(User));
		jwtService = module.get(JwtService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('login', () => {
		it('should login successfully with valid credentials', async () => {
			userRepository.findOne.mockResolvedValue(mockUser);
			mockBcrypt.compare.mockResolvedValue(true as never);
			jwtService.signAsync.mockResolvedValue(mockToken);

			const result = await service.login(mockAuthRequest);

			expect(userRepository.findOne).toHaveBeenCalledWith({
				where: { email: mockAuthRequest.email },
			});

			expect(mockBcrypt.compare).toHaveBeenCalledWith(
				mockAuthRequest.password,
				mockUser.password,
			);

			expect(jwtService.signAsync).toHaveBeenCalledWith({
				sub: mockUser.id,
				email: mockUser.email,
			});

			expect(result).toEqual({ token: mockToken });
		});

		it('should throw UserNotFoundException when user does not exist', async () => {
			userRepository.findOne.mockResolvedValue(null);

			await expect(service.login(mockAuthRequest)).rejects.toThrow(
				AuthError.UserNotFoundException,
			);
		});

		it('should throw InvalidCredentialsException when password is invalid', async () => {
			userRepository.findOne.mockResolvedValue(mockUser);
			mockBcrypt.compare.mockResolvedValue(false as never);

			await expect(service.login(mockAuthRequest)).rejects.toThrow(
				AuthError.InvalidCredentialsException,
			);
		});
	});

	describe('signup', () => {
		it('should signup successfully with new user', async () => {
			userRepository.findOne.mockResolvedValue(null);
			mockBcrypt.hash.mockResolvedValue('hashedPassword' as never);
			userRepository.create.mockReturnValue(mockUser);
			userRepository.save.mockResolvedValue(mockUser);
			jwtService.signAsync.mockResolvedValue(mockToken);

			const result = await service.signup(mockAuthRequest);

			expect(userRepository.findOne).toHaveBeenCalledWith({
				where: { email: mockAuthRequest.email },
			});

			expect(mockBcrypt.hash).toHaveBeenCalledWith(
				mockAuthRequest.password,
				12,
			);

			expect(userRepository.create).toHaveBeenCalledWith({
				email: mockAuthRequest.email,
				password: 'hashedPassword',
			});

			expect(userRepository.save).toHaveBeenCalledWith(mockUser);

			expect(result).toEqual({ token: mockToken });
		});

		it('should throw UserAlreadyExistsException when user already exists', async () => {
			userRepository.findOne.mockResolvedValue(mockUser);

			await expect(service.signup(mockAuthRequest)).rejects.toThrow(
				AuthError.UserAlreadyExistsException,
			);
		});
	});

	describe('validate', () => {
		it('should return true for valid credentials', async () => {
			userRepository.findOne.mockResolvedValue(mockUser);
			mockBcrypt.compare.mockResolvedValue(true as never);

			const result = await service.validate(
				mockAuthRequest.email,
				mockAuthRequest.password,
			);

			expect(userRepository.findOne).toHaveBeenCalledWith({
				where: { email: mockAuthRequest.email },
			});

			expect(mockBcrypt.compare).toHaveBeenCalledWith(
				mockAuthRequest.password,
				mockUser.password,
			);

			expect(result).toBe(true);
		});

		it('should return false when user does not exist', async () => {
			userRepository.findOne.mockResolvedValue(null);

			const result = await service.validate(
				mockAuthRequest.email,
				mockAuthRequest.password,
			);

			expect(result).toBe(false);
		});

		it('should return false for invalid password', async () => {
			userRepository.findOne.mockResolvedValue(mockUser);
			mockBcrypt.compare.mockResolvedValue(false as never);

			const result = await service.validate(
				mockAuthRequest.email,
				'wrongPassword',
			);

			expect(result).toBe(false);
		});
	});
});
