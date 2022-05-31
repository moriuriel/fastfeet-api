import { HttpException } from '@nestjs/common';

export class APPLICATION_ERROR extends HttpException {
  constructor(error: string, status: number) {
    super(error, status);
  }
}
