import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Roles } from 'src/modules/authentication/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/authentication/guards/roles.guard';
import { CreateDeliveryDto } from '../dtos';

@Controller('/deliveries')
export class DeliveriesController {
  @Roles('ADMIN', 'CUSTOMER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() data: CreateDeliveryDto,
    @Response() response: ExpressResponse,
  ): Promise<ExpressResponse> {
    const delivery = data;

    return response.status(HttpStatus.CREATED).json(delivery);
  }
}
