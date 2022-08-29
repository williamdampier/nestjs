import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './postgres-task/tasks.entity';
import { PostgresTaskModule } from './postgres-task/postgres-task.module';

@Module({
  imports: [
    TaskModule,
    PostgresTaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT) || 5432,
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.PASSWORD,
      entities: [Task],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
