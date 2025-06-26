import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import {
	CreateTaskDTO,
	TaskFilterDTO,
	TaskResponseDTO,
	UpdateTaskDTO,
} from './dto';
import { Task } from './entities/task.entity';
import { ITaskService } from './interfaces';

@Injectable()
export class TaskService implements ITaskService {
	constructor(
		@InjectRepository(Task)
		private taskRepository: Repository<Task>,
	) {}

	public async create(payload: CreateTaskDTO): Promise<TaskResponseDTO> {
		const task = this.taskRepository.create(payload);
		const savedTask = await this.taskRepository.save(task);
		return plainToInstance(TaskResponseDTO, savedTask);
	}

	public async findAll(filters?: TaskFilterDTO): Promise<TaskResponseDTO[]> {
		const where: any = {};

		if (filters?.category) {
			where.category = filters.category;
		}

		if (filters?.framework) {
			where.framework = filters.framework;
		}

		const tasks = await this.taskRepository.find({
			where,
			order: { createdAt: 'DESC' },
		});
		return plainToInstance(TaskResponseDTO, tasks);
	}

	public async findOne(id: string): Promise<TaskResponseDTO> {
		const task = await this.taskRepository.findOne({ where: { id } });

		if (!task) {
			throw new NotFoundException(`Task with ID ${id} not found`);
		}

		return plainToInstance(TaskResponseDTO, task);
	}

	public async update(
		id: string,
		payload: UpdateTaskDTO,
	): Promise<TaskResponseDTO> {
		const task = await this.taskRepository.findOne({ where: { id } });

		if (!task) {
			throw new NotFoundException(`Task with ID ${id} not found`);
		}

		Object.assign(task, payload);
		const updatedTask = await this.taskRepository.save(task);
		return plainToInstance(TaskResponseDTO, updatedTask);
	}

	public async delete(id: string): Promise<void> {
		const task = await this.taskRepository.findOne({ where: { id } });

		if (!task) {
			throw new NotFoundException(`Task with ID ${id} not found`);
		}

		await this.taskRepository.remove(task);
	}
}
