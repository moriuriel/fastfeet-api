export interface ICompareHashParams {
  hashed: string;
  value: string;
}

export interface IHashProvider {
  compareHash(data: ICompareHashParams): Promise<boolean>;
  generateHash(value: string): Promise<string>;
}

export interface ICryptoProvider {
  encrypt(password: string): string;
  decrypt(text): string;
  hexStringToByte(str: string): Buffer;
}
