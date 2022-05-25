import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/User.schema';
import { ICreateUser } from '../types/users.interface';
import { IUserRepository } from './IUserRepository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userRespository: Model<User>) {}

  async create(user: ICreateUser): Promise<User> {
    return this.userRespository.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRespository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRespository.findOne({ email });
  }
}
