import { Response as ExpressResponse } from 'express';
import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';

import { AuthenticationService } from '../services';
import { AuthenticationDto } from '../dtos';

@Controller('auth')
export default class AuthenticationController {
  constructor(private readonly authenticateUser: AuthenticationService) {}

  @Post()
  public async index(
    @Body() data: AuthenticationDto,
    @Response() response: ExpressResponse,
  ): Promise<ExpressResponse> {
    const { email, password } = data;

    const auth = await this.authenticateUser.execute({
      email,
      password,
    });

    return response.status(HttpStatus.CREATED).json(auth);
  }
}
