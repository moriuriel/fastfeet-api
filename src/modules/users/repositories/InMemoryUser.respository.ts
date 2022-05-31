import { Types } from 'mongoose';
import { IPagination } from 'src/shared/decorators/GetPagination/GetPagination.interface';
import { User } from '../schemas/User.schema';
import { ICreateUser } from '../types';
import { IFindAllResponse, IUserRepository } from './UserRepository.interface';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(user: ICreateUser): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, {
      _id: new Types.ObjectId(),
      ...user,
    });

    this.users.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user._id === id);

    return user;
  }

  async findAll(pagination: IPagination): Promise<IFindAllResponse> {
    return {
      users: this.users,
      total: this.users.length,
    };
  }
}
