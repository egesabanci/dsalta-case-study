import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskFramework, TaskCategory } from '../../enums';

export class CreateTaskDTO {
  @ApiProperty({
    description: 'Task name',
    example: 'Monitor system health',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Monitor the overall health of the system components',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    description: 'Task framework',
    enum: TaskFramework,
    example: TaskFramework.DSALTA,
  })
  @IsEnum(TaskFramework, { message: 'Framework must be a valid enum value' })
  @IsNotEmpty({ message: 'Framework is required' })
  framework: TaskFramework;

  @ApiProperty({
    description: 'Task category',
    enum: TaskCategory,
    example: TaskCategory.MONITORING,
  })
  @IsEnum(TaskCategory, { message: 'Category must be a valid enum value' })
  @IsNotEmpty({ message: 'Category is required' })
  category: TaskCategory;
}
