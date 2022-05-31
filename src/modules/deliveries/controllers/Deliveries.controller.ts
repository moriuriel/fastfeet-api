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
import { CreateDeliveryService } from '../services';

@Controller('/deliveries')
export class DeliveriesController {
  constructor(private readonly createDeliveryService: CreateDeliveryService) {}

  @Roles('ADMIN', 'CUSTOMER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() data: CreateDeliveryDto,
    @Response() response: ExpressResponse,
  ): Promise<ExpressResponse> {
    const { owner, products, shipping_address } = data;

    const delivery = await this.createDeliveryService.execute({
      owner,
      products,
      shipping_address,
    });

    return response.status(HttpStatus.CREATED).json(delivery);
  }
}
