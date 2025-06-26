import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TaskFramework, TaskCategory, TaskStatus } from '../enums';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskFramework,
    nullable: false,
  })
  framework: TaskFramework;

  @Column({
    type: 'enum',
    enum: TaskCategory,
    nullable: false,
  })
  category: TaskCategory;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
    nullable: false,
  })
  status: TaskStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
