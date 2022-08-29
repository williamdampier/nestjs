import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';
import { CreateTaskDTO } from 'src/task/dto/create-task.dto';
import { TaskStatus } from 'src/task/task-status.enum';
import { UpdateTaskStatusDto } from 'src/task/dto/update-task-status.dto';
import { GetTasksFilterDto } from 'src/task/dto/get-task-filter.dto';

@Injectable()
export class PostgresTaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
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

  async updateTaskStatus(
    id: string,
    updateTaskStatus: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    await this.tasksRepository.update({ id }, { status });
    return this.tasksRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
