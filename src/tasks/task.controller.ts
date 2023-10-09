import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

import { Task } from './task.entity';
import { TasksService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.tasksService.update(+id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }

  @Put(':id/deadline')
  setDeadline(@Param('id') id: string, @Body() body: { deadline: Date }): Promise<Task> {
  return this.tasksService.setDeadline(+id, body.deadline);
}

@Get('by-deadline')
findAllByDeadline(): Promise<Task[]> {
  return this.tasksService.findAllByDeadline();
}

}
