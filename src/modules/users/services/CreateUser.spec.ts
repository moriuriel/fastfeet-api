import {
  BcryptProvider,
  CryptoProvider,
} from 'src/shared/providers/hashProvider/implementations';
import { InMemoryUserRepository } from '../repositories/InMemoryUser.respository';
import { ICreateUser, UserType } from '../types';
import { CreateUserService } from './CreateUser.service';

let createUserService: CreateUserService;

let inMemoryUserRepository: InMemoryUserRepository;

let bcryptProvider: BcryptProvider;

let cryptoProvider: CryptoProvider;

const userEntity: ICreateUser = {
  document: 'valid-document',
  name: 'valid-name',
  email: 'valid-email',
  password: 'valid-password',
  type: UserType.DELIVERYMAN,
};
describe('Create User Serivce', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();

    bcryptProvider = new BcryptProvider();

    cryptoProvider = new CryptoProvider();

    createUserService = new CreateUserService(
      cryptoProvider,
      bcryptProvider,
      inMemoryUserRepository,
    );
  });
  test('should be defined', () => {
    expect(createUserService).toBeInstanceOf(CreateUserService);
  });

  test('should be create new user', async () => {
    const userCreated = await createUserService.execute(userEntity);

    expect(userCreated).toHaveProperty('_id');
  });
});
