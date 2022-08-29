import { Module } from '@nestjs/common';
import { PostgresTaskController } from './postgres-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [PostgresTaskController],
  providers: [],
})
export class PostgresTaskModule {}
