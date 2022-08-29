import { Module } from '@nestjs/common';
import { PostgresTaskController } from './postgres-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { PostgresTaskService } from './postgres-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [PostgresTaskController],
  providers: [PostgresTaskService],
})
export class PostgresTaskModule {}
