import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { Roles } from 'src/modules/authentication/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/authentication/guards/roles.guard';

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

  @Get()
  @Roles('CUSTOMER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async index(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
  ) {
    return response.status(HttpStatus.OK).json({ true: 'ok' });
  }
}
