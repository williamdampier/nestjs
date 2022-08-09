import { GetTasksFilterDto } from './dto/get-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import { filter } from 'rxjs';
import { UpdateTaskStatusDto } from './dto/update-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length){
      return this.tasksService.getTasksWithFilters(filterDto)
    }
    else {
      return this.tasksService.getAllTasks();
    }
    
  }

  @Get('/:id')
  getTaskById(@Param('id') id:string):Task {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id:string, @Body() updateTaskStatusDto: UpdateTaskStatusDto) :Task {
    const {status} = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string):void {
    return this.tasksService.deleteTask(id)
  }
}
