import { IAccount } from "../interfaces/account";

/**
 * This is a MOCKUP from a list of accounts in which the 'clientId' of each account is the foreign key for associated client
 * It was considered a 1-1 Client and Account relationship. But this could be improved to 1-n relationship, it will depend on the modelling
 */
export const accounts: IAccount[] = [
  {
    id: 1,
    clientId: 6,
    accountNumber: "66341",
    balance: 23189.45,
    status: "positive"
  },
  {
    id: 2,
    clientId: 19,
    accountNumber: "90123",
    balance: 32458.16,
    status: "positive"
  },
  {
    id: 3,
    clientId: 11,
    accountNumber: "12345",
    balance: 7893.42,
    status: "positive"
  },
  {
    id: 4,
    clientId: 15,
    accountNumber: "56789",
    balance: 41256.87,
    status: "positive"
  },
  {
    id: 5,
    clientId: 12,
    accountNumber: "67890",
    balance: -23147.90,
    status: "negative"
  },
  {
    id: 6,
    clientId: 14,
    accountNumber: "45678",
    balance: -300,
    status: "negative"
  },
  {
    id: 7,
    clientId: 8,
    accountNumber: "11224",
    balance: 18372.01,
    status: "positive"
  },
  {
    id: 8,
    clientId: 1,
    accountNumber: "33543",
    balance: -45698.23,
    status: "negative"
  },
  {
    id: 9,
    clientId: 17,
    accountNumber: "78901",
    balance: 12345.67,
    status: "positive"
  },
  {
    id: 10,
    clientId: 18,
    accountNumber: "89012",
    balance: 25893.10,
    status: "positive"
  },
  {
    id: 11,
    clientId: 9,
    accountNumber: "99934",
    balance: -9871.23,
    status: "negative"
  },
  {
    id: 12,
    clientId: 20,
    accountNumber: "67891",
    balance: 47852.14,
    status: "positive"
  },
  {
    id: 13,
    clientId: 5,
    accountNumber: "77534",
    balance: -250,
    status: "negative"
  },
  {
    id: 14,
    clientId: 13,
    accountNumber: "34567",
    balance: 500,
    status: "positive"
  },
  {
    id: 15,
    clientId: 4,
    accountNumber: "33346",
    balance: 700,
    status: "positive"
  },
  {
    id: 16,
    clientId: 16,
    accountNumber: "23456",
    balance: -200,
    status: "negative"
  },
  {
    id: 17,
    clientId: 3,
    accountNumber: "66778",
    balance: -800,
    status: "negative"
  },
  {
    id: 18,
    clientId: 7,
    accountNumber: "12223",
    balance: -1500,
    status: "negative"
  },
  {
    id: 19,
    clientId: 2,
    accountNumber: "22444",
    balance: 300,
    status: "positive"
  },
  {
    id: 20,
    clientId: 10,
    accountNumber: "88766",
    balance: 400,
    status: "positive"
  }
];
