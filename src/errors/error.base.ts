import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
	public readonly name: string;
	public readonly error: string;
	public readonly message: string;
	public readonly code: HttpStatus;

	constructor(name: string, error: string, message: string, code: HttpStatus) {
		super(message, code);
		this.name = name;
		this.error = error;
		this.message = message;
		this.code = code;
	}
}
