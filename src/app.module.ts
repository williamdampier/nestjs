import { Module } from '@nestjs/common';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
