import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IPagination } from './GetPagination.interface';

export const GetPagination = createParamDecorator(
  (data, context: ExecutionContext): IPagination => {
    const request: Request = context.switchToHttp().getRequest();

    const pagination: IPagination = {
      page: request.query.page ? parseInt(request.query.page.toString()) : 1,
      limit: request.query.limit
        ? parseInt(request.query.limit.toString())
        : 20,
    };

    return pagination;
  },
);
