import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Roles } from 'src/modules/authentication/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/authentication/guards/roles.guard';
import {
  GetPagination,
  IPagination,
} from 'src/shared/decorators/GetPagination';
import { CreateDeliveryDto } from '../dtos';
import { CreateDeliveryService, FindAllDeliveriesService } from '../services';

@Controller('/deliveries')
export class DeliveriesController {
  constructor(
    private readonly createDeliveryService: CreateDeliveryService,
    private readonly findAllDeliveriesSerivice: FindAllDeliveriesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(
    @GetPagination() pagination: IPagination,
    @Response() response: ExpressResponse,
  ): Promise<ExpressResponse> {
    const deliveries = await this.findAllDeliveriesSerivice.execute(pagination);

    return response.status(HttpStatus.OK).json(deliveries);
  }

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
