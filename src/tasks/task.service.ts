import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async create(task: Task): Promise<Task> {
    return await this.tasksRepository.save(task);
  }

  async update(id: number, task: Task): Promise<Task> {
    await this.tasksRepository.update(id, { ...task });
    return await this.tasksRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async setDeadline(id: number, deadline: Date): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    task.deadline = deadline;
    return await this.tasksRepository.save(task);
  }

  async findAllByDeadline(): Promise<Task[]> {
    return await this.tasksRepository.createQueryBuilder('task')
      .where('task.deadline IS NOT NULL')
      .orderBy('task.deadline', 'ASC')
      .getMany();
  }
  
}
