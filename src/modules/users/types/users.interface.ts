import { IPagination } from 'src/shared/decorators/GetPagination/GetPagination.interface';
import { User } from '../schemas/User.schema';

export interface ICreateUser {
  name: string;
  document: string;
  email: string;
  password: string;
  type: string;
}

export interface IFindAllUserResponse {
  pagination: IPagination;
  users: User[];
}
