import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { TaskService } from './task.service';
import { ITaskController } from './interfaces';
import { CreateTaskDTO, UpdateTaskDTO, TaskResponseDTO } from './dto';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('task')
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController implements ITaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Create a new task with the provided details',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task created successfully',
    type: TaskResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  public async create(
    @Body() payload: CreateTaskDTO,
  ): Promise<TaskResponseDTO> {
    return this.taskService.create(payload);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Retrieve a list of all tasks',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tasks retrieved successfully',
    type: [TaskResponseDTO],
  })
  public async findAll(): Promise<TaskResponseDTO[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get task by ID',
    description: 'Retrieve a single task by its ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task retrieved successfully',
    type: TaskResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  public async findOne(@Param('id') id: string): Promise<TaskResponseDTO> {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a task',
    description: 'Update one or more fields of an existing task',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task updated successfully',
    type: TaskResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  public async update(
    @Param('id') id: string,
    @Body() payload: UpdateTaskDTO,
  ): Promise<TaskResponseDTO> {
    return this.taskService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a task',
    description: 'Delete a task by its ID',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Task deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  public async delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }
}
