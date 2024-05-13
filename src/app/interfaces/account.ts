/**
 * Interface of a Bank Account
 */
export interface IAccount {
  id: number,
  clientId: number;
  accountNumber: string;
  balance: number;
  status: string;
}

export const transactionTypes = {
  addMoney: 'add',
  transferMoney: 'transfer'
}
