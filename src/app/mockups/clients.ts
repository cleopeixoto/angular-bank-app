import { IClient } from "../interfaces/IClient";

/**
 * This is a MOCKUP from a list of clients in which the 'accountNumber' of each client is the foreign key for client's account
 */
export const clients: IClient[] = [
  {
    id: 1,
    name: 'Cléo Cunha Peixoto',
    email: 'cleocpeixoto@gmail.com',
    age: 31,
    accountNumber: '24980',
  },
  {
    id: 2,
    name: 'Paulo Victor Pereira',
    email: 'paulovictorpereira@emailtest.com',
    age: 37,
    accountNumber: '23094',
  },
  {
    id: 3,
    name: 'Claudia Motta',
    email: 'claudiamotta@emailtest.com',
    age: 44,
    accountNumber: '23546',
  }
];