import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from './error.base';

export class TaskNotFoundException extends BaseHttpException {
	constructor(id?: string) {
		const message = id ? `Task with ID ${id} not found` : 'Task not found';
		super(
			'TaskNotFound',
			'Not Found',
			message,
			HttpStatus.NOT_FOUND,
		);
	}
}