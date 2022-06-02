import {
  Controller,
  Get,
  HttpStatus,
  Param,
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
import { FindAllDeliveriesByCustomerService } from '../services';

@Controller('/deliveries/customer')
export class FindAllDeliveriesByCustomerController {
  constructor(
    private readonly findAllDeliveriesByCustomerSerivice: FindAllDeliveriesByCustomerService,
  ) {}

  @Roles('ADMIN', 'CUSTOMER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':customer_id')
  async index(
    @GetPagination() pagination: IPagination,
    @Response() response: ExpressResponse,
    @Param('customer_id') customerId: string,
  ): Promise<ExpressResponse> {
    const deliveries = await this.findAllDeliveriesByCustomerSerivice.execute(
      pagination,
      customerId,
    );

    return response.status(HttpStatus.OK).json(deliveries);
  }
}
