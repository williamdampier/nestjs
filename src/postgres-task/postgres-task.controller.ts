import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from 'src/task/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/task/dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from 'src/task/dto/update-task-status.dto';
import { PostgresTaskService } from './postgres-task.service';
import { Task } from './tasks.entity';

@Controller('postgres')
export class PostgresTaskController {
  constructor(private taskService: PostgresTaskService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getAllTasks(filterDto);
  }

  @Get(':id')
  getOneTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getOneTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updatedStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, updatedStatusDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): string {
    const deleted = this.taskService.remove(id);
    if (deleted) return `Item with id:${id} removed`;
    return `unable to delete item with id:${id}`;
  }
}
