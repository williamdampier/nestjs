import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDTO } from 'src/task/dto/create-task.dto';
import { PostgresTaskService } from './postgres-task.service';
import { Task } from './tasks.entity';

@Controller('postgres')
export class PostgresTaskController {
  constructor(private taskService: PostgresTaskService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getOneTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getOneTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): string {
    const deleted = this.taskService.remove(id);
    if (deleted) return `Item with id:${id} removed`;
    return `unable to delete item with id:${id}`;
  }
}
