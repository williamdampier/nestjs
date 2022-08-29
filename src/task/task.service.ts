import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  tasks;

  getTasks(): string {
    return 'hello';
  }
}
