import { IAccount } from "../interfaces/IAccount";

/**
 * This is a MOCKUP from a list of accounts in which the 'clientId' of each account is the foreign key for associated client
 */
export const accounts: IAccount[] = [
  {
    id: 1,
    clientId: 2,
    accountNumber: '23094',
    balance: 100.023,
    status: 'positive'
  },
  {
    id: 2,
    clientId: 1,
    accountNumber: '24980',
    balance: 30.980,
    status: 'positive',
  },
  {
    id: 3,
    clientId: 3,
    accountNumber: '23546',
    balance: -980,
    status: 'negative'
  }
]