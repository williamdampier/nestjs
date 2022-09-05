import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { createContext } from 'vm';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.User;
  },
);
