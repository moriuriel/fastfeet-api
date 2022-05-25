import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import {
  IUserRepository,
  UserRepository,
} from 'src/modules/users/repositories';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();

    const id = request.user.id;

    const user = await this.userRepository.findById(id);

    const hasAccess = roles.indexOf(user.type) > -1;

    if (!hasAccess) {
      throw new ForbiddenException();
    }

    return true;
  }
}
