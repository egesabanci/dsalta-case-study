import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsOptional } from 'class-validator';

import { TaskCategory, TaskFramework } from '../../enums';

export class TaskFilterDTO {
	@ApiPropertyOptional({
		description: 'Filter tasks by category',
		enum: TaskCategory,
		example: TaskCategory.MONITORING,
	})
	@IsEnum(TaskCategory, { message: 'Category must be a valid enum value' })
	@IsOptional()
	category?: TaskCategory;

	@ApiPropertyOptional({
		description: 'Filter tasks by framework',
		enum: TaskFramework,
		example: TaskFramework.DSALTA,
	})
	@IsEnum(TaskFramework, { message: 'Framework must be a valid enum value' })
	@IsOptional()
	framework?: TaskFramework;
}
