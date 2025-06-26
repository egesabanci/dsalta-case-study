import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthRequestDTO {
	@ApiProperty({
		description: 'User email address',
		example: 'test@email.com',
	})
	@IsEmail({}, { message: 'Please provide a valid email address' })
	@IsNotEmpty({ message: 'Email is required' })
	@Transform(({ value }) => value?.toLowerCase().trim())
	email: string;

	@ApiProperty({
		description: 'User password',
		example: 'test-password',
		minLength: 8,
	})
	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	password: string;
}
