import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, UserRepository } from '../repositories';
import { DATABASE_ERROR } from 'src/shared/errors/exceptions';
import { IPagination } from 'src/shared/decorators/GetPagination/GetPagination.interface';
import { IFindAllUserResponse } from '../types';

@Injectable()
export class FindAllUsersService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(pagination: IPagination): Promise<IFindAllUserResponse> {
    try {
      const { users, total } = await this.userRepository.findAll(pagination);

      return {
        users,
        pagination: {
          ...pagination,
          total,
        },
      };
    } catch (error) {
      throw new DATABASE_ERROR(error);
    }
  }
}
