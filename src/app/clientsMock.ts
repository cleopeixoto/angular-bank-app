import { IClient } from "./interfaces/IClient";

/**
 * This is a MOCKUP of a list of clients with the 'account' as each client foreign key
 * Getting all 1-1 associated account information
 */
export const clients: IClient[] = [
  {
    id: 1,
    name: 'Cléo Cunha Peixoto',
    email: 'cleocpeixoto@gmail.com',
    age: 31,
    account: {
      id: 2,
      accountNumber: '24980',
      balance: 30.980,
      status: 'positive',
    },
  },
  {
    id: 2,
    name: 'Paulo Victor Pereira',
    email: 'paulovictorpereira@emailtest.com',
    age: 37,
    account: {
      id: 1,
      accountNumber: '23094',
      balance: 100.023,
      status: 'positive'
    },
  },
  {
    id: 3,
    name: 'Claudia Motta',
    email: 'claudiamotta@emailtest.com',
    age: 44,
    account: {
      id: 3,
      accountNumber: '23546',
      balance: -980,
      status: 'negative'
    },
  }
];