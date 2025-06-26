import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateTaskDTO, TaskFilterDTO, UpdateTaskDTO } from './dto';
import { Task } from './entities/task.entity';
import { TaskCategory, TaskFramework, TaskStatus } from './enums';
import { TaskService } from './task.service';
import { TaskError } from '../errors';

describe('TaskService', () => {
	let service: TaskService;
	let repository: jest.Mocked<Repository<Task>>;

	const mockTask: Task = {
		id: '123e4567-e89b-12d3-a456-426614174000',
		name: 'Test Task',
		description: 'Test Description',
		framework: TaskFramework.DSALTA,
		category: TaskCategory.MONITORING,
		status: TaskStatus.OPEN,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockCreateTaskDTO: CreateTaskDTO = {
		name: 'Test Task',
		description: 'Test Description',
		framework: TaskFramework.DSALTA,
		category: TaskCategory.MONITORING,
	};

	const mockUpdateTaskDTO: UpdateTaskDTO = {
		name: 'Updated Task',
		status: TaskStatus.IN_PROGRESS,
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TaskService,
				{
					provide: getRepositoryToken(Task),
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						find: jest.fn(),
						findOne: jest.fn(),
						remove: jest.fn(),
					},
				},
				{
					provide: 'CACHE_MANAGER',
					useValue: {
						get: jest.fn(),
						set: jest.fn(),
						del: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<TaskService>(TaskService);
		repository = module.get(getRepositoryToken(Task));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		it('should create a new task successfully', async () => {
			repository.create.mockReturnValue(mockTask);
			repository.save.mockResolvedValue(mockTask);

			const result = await service.create(mockCreateTaskDTO);

			expect(repository.create).toHaveBeenCalledWith(mockCreateTaskDTO);
			expect(repository.save).toHaveBeenCalledWith(mockTask);

			expect(result).toMatchObject({
				id: mockTask.id,
				name: mockTask.name,
				description: mockTask.description,
			});
		});
	});

	describe('findAll', () => {
		it('should return all tasks ordered by createdAt DESC without any filters', async () => {
			const mockTasks = [mockTask];
			repository.find.mockResolvedValue(mockTasks);

			const result = await service.findAll();

			expect(repository.find).toHaveBeenCalledWith({
				order: { createdAt: 'DESC' },
			});

			expect(result).toHaveLength(1);
			expect(result[0]).toMatchObject({
				id: mockTask.id,
				name: mockTask.name,
			});
		});

		it('should return empty array when no tasks exist', async () => {
			repository.find.mockResolvedValue([]);

			const result = await service.findAll();

			expect(result).toEqual([]);
		});
	});

	describe('findAllWithFilter', () => {
		it('should filter tasks by category when category filter is provided', async () => {
			const mockTasks = [mockTask];
			repository.find.mockResolvedValue(mockTasks);

			const filters: TaskFilterDTO = { category: TaskCategory.MONITORING };
			const result = await service.findAllWithFilter(filters);

			expect(repository.find).toHaveBeenCalledWith({
				where: { category: TaskCategory.MONITORING },
				order: { createdAt: 'DESC' },
			});

			expect(result).toHaveLength(1);
		});

		it('should filter tasks by framework when framework filter is provided', async () => {
			const mockTasks = [mockTask];
			repository.find.mockResolvedValue(mockTasks);

			const filters: TaskFilterDTO = { framework: TaskFramework.DSALTA };
			const result = await service.findAllWithFilter(filters);

			expect(repository.find).toHaveBeenCalledWith({
				where: { framework: TaskFramework.DSALTA },
				order: { createdAt: 'DESC' },
			});

			expect(result).toHaveLength(1);
		});

		it('should filter tasks by both category and framework when both filters are provided', async () => {
			const mockTasks = [mockTask];
			repository.find.mockResolvedValue(mockTasks);

			const filters: TaskFilterDTO = {
				category: TaskCategory.MONITORING,
				framework: TaskFramework.DSALTA,
			};
			const result = await service.findAllWithFilter(filters);

			expect(repository.find).toHaveBeenCalledWith({
				where: {
					category: TaskCategory.MONITORING,
					framework: TaskFramework.DSALTA,
				},
				order: { createdAt: 'DESC' },
			});

			expect(result).toHaveLength(1);
		});

		it('should return empty array when no filtered tasks exist', async () => {
			repository.find.mockResolvedValue([]);

			const filters: TaskFilterDTO = { category: TaskCategory.MONITORING };
			const result = await service.findAllWithFilter(filters);

			expect(result).toEqual([]);
		});
	});

	describe('findOne', () => {
		it('should return a task when found', async () => {
			repository.findOne.mockResolvedValue(mockTask);

			const result = await service.findOne(mockTask.id);

			expect(repository.findOne).toHaveBeenCalledWith({
				where: { id: mockTask.id },
			});

			expect(result).toMatchObject({
				id: mockTask.id,
				name: mockTask.name,
			});
		});

		it('should throw TaskNotFoundException when task not found', async () => {
			repository.findOne.mockResolvedValue(null);

			await expect(service.findOne('non-existent-id')).rejects.toThrow(
				TaskError.TaskNotFoundException,
			);

			await expect(service.findOne('non-existent-id')).rejects.toThrow(
				'Task with ID non-existent-id not found',
			);
		});
	});

	describe('update', () => {
		it('should update a task successfully', async () => {
			const updatedTask = { ...mockTask, ...mockUpdateTaskDTO };
			repository.findOne.mockResolvedValue(mockTask);
			repository.save.mockResolvedValue(updatedTask);

			const result = await service.update(mockTask.id, mockUpdateTaskDTO);

			expect(repository.findOne).toHaveBeenCalledWith({
				where: { id: mockTask.id },
			});

			expect(repository.save).toHaveBeenCalledWith(updatedTask);
			expect(result.name).toBe(mockUpdateTaskDTO.name);
			expect(result.status).toBe(mockUpdateTaskDTO.status);
		});

		it('should throw TaskNotFoundException when task to update not found', async () => {
			repository.findOne.mockResolvedValue(null);

			await expect(
				service.update('non-existent-id', mockUpdateTaskDTO),
			).rejects.toThrow(TaskError.TaskNotFoundException);
		});
	});

	describe('delete', () => {
		it('should delete a task successfully', async () => {
			repository.findOne.mockResolvedValue(mockTask);
			repository.remove.mockResolvedValue(mockTask);

			await service.delete(mockTask.id);

			expect(repository.findOne).toHaveBeenCalledWith({
				where: { id: mockTask.id },
			});

			expect(repository.remove).toHaveBeenCalledWith(mockTask);
		});

		it('should throw TaskNotFoundException when task to delete not found', async () => {
			repository.findOne.mockResolvedValue(null);

			await expect(service.delete('non-existent-id')).rejects.toThrow(
				TaskError.TaskNotFoundException,
			);
		});
	});
});
