import { User } from '../schemas/User.schema';
import { ICreateUser } from '../types/users.interface';

export interface IUserRepository {
  create(user: ICreateUser): Promise<User>;
  findAll(): Promise<User[]>;
}
