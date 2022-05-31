import { IPagination } from 'src/shared/decorators/GetPagination/GetPagination.interface';
import { InMemoryUserRepository } from '../repositories/InMemoryUser.respository';
import { FindAllUsersService } from './FindAllUsers.service';

let findAllUsersService: FindAllUsersService;

let inMemoryUserRepository: InMemoryUserRepository;

const paginationEntity: IPagination = {
  page: 1,
  limit: 20,
};
describe('Find All Users Serivce', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();

    findAllUsersService = new FindAllUsersService(inMemoryUserRepository);
  });

  test('should be defined', () => {
    expect(findAllUsersService).toBeInstanceOf(FindAllUsersService);
  });

  test('should be find all users', async () => {
    const usersList = await findAllUsersService.execute(paginationEntity);

    expect(usersList).toHaveProperty('users');

    expect(usersList).toHaveProperty('pagination');

    expect(usersList.pagination.total).toBe(0);
  });
});
