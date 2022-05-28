import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPagination } from 'src/shared/decorators/GetPagination/GetPagination.interface';
import { User } from '../schemas/User.schema';
import { ICreateUser } from '../types/users.interface';
import { IFindAllResponse, IUserRepository } from './IUserRepository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userRespository: Model<User>) {}

  async create(user: ICreateUser): Promise<User> {
    return this.userRespository.create(user);
  }

  async findAll({ limit, page }: IPagination): Promise<IFindAllResponse> {
    const total = await this.userRespository.count();

    const users = await this.userRespository
      .find()
      .limit(limit)
      .skip((page - 1) * limit);

    return { total, users };
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRespository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return this.userRespository.findOne({ id });
  }
}
