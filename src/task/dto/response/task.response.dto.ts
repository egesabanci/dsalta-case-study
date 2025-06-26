import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { TaskCategory, TaskFramework, TaskStatus } from '../../enums';

export class TaskResponseDTO {
	@ApiProperty({
		description: 'Task ID (UUID)',
	})
	@Expose()
	id: string;

	@ApiProperty({
		description: 'Task name',
		example: 'Monitor system health',
	})
	@Expose()
	name: string;

	@ApiProperty({
		description: 'Task description',
		example: 'Monitor the overall health of the system components',
	})
	@Expose()
	description: string;

	@ApiProperty({
		description: 'Task framework',
		enum: TaskFramework,
		example: TaskFramework.DSALTA,
	})
	@Expose()
	framework: TaskFramework;

	@ApiProperty({
		description: 'Task category',
		enum: TaskCategory,
		example: TaskCategory.MONITORING,
	})
	@Expose()
	category: TaskCategory;

	@ApiProperty({
		description: 'Task status',
		enum: TaskStatus,
		example: TaskStatus.OPEN,
	})
	@Expose()
	status: TaskStatus;

	@ApiProperty({
		description: 'Task creation date',
	})
	@Expose()
	createdAt: Date;

	@ApiProperty({
		description: 'Task last update date',
	})
	@Expose()
	updatedAt: Date;
}
