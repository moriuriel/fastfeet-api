import { compare, hash } from 'bcryptjs';
import { ICompareHashParams, IHashProvider } from '../types';

export class BcryptProvider implements IHashProvider {
  async compareHash({ hashed, value }: ICompareHashParams): Promise<boolean> {
    return compare(value, hashed);
  }

  async generateHash(value: string): Promise<string> {
    return hash(value, 10);
  }
}
