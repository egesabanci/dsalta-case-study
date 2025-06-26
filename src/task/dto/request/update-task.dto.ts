import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskFramework, TaskCategory, TaskStatus } from '../../enums';

export class UpdateTaskDTO {
  @ApiPropertyOptional({
    description: 'Task name',
    example: 'Monitor system health',
  })
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Task description',
    example: 'Monitor the overall health of the system components',
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Task framework',
    enum: TaskFramework,
    example: TaskFramework.DSALTA,
  })
  @IsEnum(TaskFramework, { message: 'Framework must be a valid enum value' })
  @IsOptional()
  framework?: TaskFramework;

  @ApiPropertyOptional({
    description: 'Task category',
    enum: TaskCategory,
    example: TaskCategory.MONITORING,
  })
  @IsEnum(TaskCategory, { message: 'Category must be a valid enum value' })
  @IsOptional()
  category?: TaskCategory;

  @ApiPropertyOptional({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
  })
  @IsEnum(TaskStatus, { message: 'Status must be a valid enum value' })
  @IsOptional()
  status?: TaskStatus;
}
