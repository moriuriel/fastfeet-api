import { IPagination } from 'src/shared/decorators/GetPagination/GetPagination.interface';
import { User } from '../schemas/User.schema';
import { ICreateUser } from '../types/users.interface';

export interface IUserRepository {
  create(user: ICreateUser): Promise<User>;
  findAll(pagination: IPagination): Promise<IFindAllResponse>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export interface IFindAllResponse {
  users: User[];
  total: number;
}
