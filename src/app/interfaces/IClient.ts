import { IAccount } from "./IAccount";

/**
 * Interface of a Client
 */
export interface IClient {
  id: number;
  name: string;
  email: string;
  age: number | string;
  account?: IAccount;
}
