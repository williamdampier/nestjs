import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.interface';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Array<Task> = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskByID(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  getTasksWithfilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  createTasks(createTaskDto: CreateTaskDTO): Task {
    const { title, description } = createTaskDto;
    const newTask: Task = {
      title,
      description,
      id: uuid(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskByID(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
