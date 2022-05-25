import { Inject, Injectable } from '@nestjs/common';
import { User } from '../schemas/User.schema';
import { IUserRepository, UserRepository } from '../repositories';
import { DATABASE_ERROR } from 'src/shared/errors/exceptions';

@Injectable()
export class FindAllUsersService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();

      return users;
    } catch (error) {
      throw new DATABASE_ERROR(error);
    }
  }
}
