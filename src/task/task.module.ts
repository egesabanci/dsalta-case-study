import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

const modules = [TypeOrmModule.forFeature([Task])];

const controllers = [TaskController];

const providers = [TaskService];

@Module({
	imports: [...modules],
	providers: [...providers],
	controllers: [...controllers],
})
export class TaskModule {}
