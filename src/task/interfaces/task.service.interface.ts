import { CreateTaskDTO, TaskResponseDTO, UpdateTaskDTO } from '../dto';

export interface ITaskService {
	create(payload: CreateTaskDTO): Promise<TaskResponseDTO>;
	findAll(): Promise<TaskResponseDTO[]>;
	findOne(id: string): Promise<TaskResponseDTO>;
	update(id: string, payload: UpdateTaskDTO): Promise<TaskResponseDTO>;
	delete(id: string): Promise<void>;
}
