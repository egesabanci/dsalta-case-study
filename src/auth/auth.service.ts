import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities';
import { IAuthService } from './interfaces';
import { AuthRequestDTO, AuthResponseDTO } from './dto';

import { AuthError } from '@dsalta-case/common/errors';

@Injectable()
export class AuthService implements IAuthService {
  private readonly saltRounds = 12;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async login(payload: AuthRequestDTO): Promise<AuthResponseDTO> {
    const { email, password } = payload;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AuthError.UserNotFoundException();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AuthError.InvalidCredentialsException();
    }

    const token = await this.generateToken(user);
    return { token };
  }

  public async signup(payload: AuthRequestDTO): Promise<AuthResponseDTO> {
    const { email, password } = payload;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new AuthError.UserAlreadyExistsException();
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    const token = await this.generateToken(savedUser);

    return { token };
  }

  public async validate(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? await bcrypt.compare(password, user.password) : false;
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }
}
