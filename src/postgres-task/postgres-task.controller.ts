import { Controller, Get } from '@nestjs/common';

@Controller('postgres')
export class PostgresTaskController {
  @Get()
  getTasks(): void {
    console.log('postgres here');
  }
}
