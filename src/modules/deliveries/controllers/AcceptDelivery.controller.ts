import {
  Controller,
  HttpStatus,
  Param,
  Patch,
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
import { AcceptDeliveryService } from '../services';

@Controller('deliveries/accept')
export class AcceptDeliveryController {
  constructor(private readonly acceptDeliveryService: AcceptDeliveryService) {}

  @Roles('ADMIN', 'DELIVERYMAN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':delivery_id')
  async index(
    @Param('delivery_id') delivery_id: string,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
  ): Promise<ExpressResponse> {
    const { id } = request.user;

    const deliveryAccepted = await this.acceptDeliveryService.execute({
      deliveryId: delivery_id,
      deliveryManId: id,
    });

    return response.status(HttpStatus.ACCEPTED).json(deliveryAccepted);
  }
}
