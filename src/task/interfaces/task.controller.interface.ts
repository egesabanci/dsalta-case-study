import {
	CreateTaskDTO,
	TaskFilterDTO,
	TaskResponseDTO,
	UpdateTaskDTO,
} from '../dto';

export interface ITaskController {
	create(payload: CreateTaskDTO): Promise<TaskResponseDTO>;
	findAll(): Promise<TaskResponseDTO[]>;
	findAllWithFilter(filters: TaskFilterDTO): Promise<TaskResponseDTO[]>;
	findOne(id: string): Promise<TaskResponseDTO>;
	update(id: string, payload: UpdateTaskDTO): Promise<TaskResponseDTO>;
	delete(id: string): Promise<void>;
}
