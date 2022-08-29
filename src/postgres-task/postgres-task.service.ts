import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from 'src/task/dto/create-task.dto';
import { TaskStatus } from 'src/task/task-status.enum';

@Injectable()
export class PostgresTaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  getOneTask(id: string): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }

  createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
