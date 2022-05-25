import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { CreateUserDto } from '../dtos';
import { CreateUserService } from '../services';

@Controller('/users')
export class UsersController {
  constructor(private readonly createUserSerivce: CreateUserService) {}
  @Post()
  async create(
    @Body() data: CreateUserDto,
    @Response() response: ExpressResponse,
  ) {
    const user = await this.createUserSerivce.execute(data);

    return response.status(HttpStatus.CREATED).json({ user });
  }
}
