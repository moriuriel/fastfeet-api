import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { CreateUserDto } from '../dtos';

@Controller('/users')
export class UsersController {
  @Post()
  async create(
    @Body() data: CreateUserDto,
    @Response() response: ExpressResponse,
  ) {
    return response.status(HttpStatus.CREATED).json({ user: data });
  }
}
