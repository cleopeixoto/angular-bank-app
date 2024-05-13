import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { IAccount } from '../interfaces/account';
import { generateId } from '../components/utils';
import { accounts } from '../mockups/accounts';

export enum AccountStatus {
  NEGATIVE,
  POSITIVE
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: IAccount[] = [];

  constructor() {
    this.accounts = accounts;
  }

  /**
   * Get all client accounts, simulating a GET request to the API
   * @returns List of current accounts
   */
  getAccounts(): IAccount[] {
    return this.accounts;
  }

  /**
   * Get an account by its number, simulating a GET request to the API
   * @param accountNumber The number of the account
   * @returns The account
   */
  getAccountByNumber(accountNumber: string): IAccount | undefined {
    return this.accounts.find((account) => account.accountNumber === accountNumber);
  }

  /**
   * Create a client by its id, simulating a POST request to the API
   * @param data The data information of the new client
   * @returns The new client object
   */
  createAccount(clientId: number): IAccount {
    // Simulate a new account with no money yet
    const newAccount = {
      id: generateId(this.accounts),
      clientId,
      accountNumber: this.generateAccountNumber(),
      balance: 0,
      status: 'positive',
    }
    this.accounts.push(newAccount);

    return newAccount;
  }

  /**
   * Generate a random account number
   * @returns Return the generated account number
   */
  generateAccountNumber(): string {
    let newAccountNumber = uuidv4();
    newAccountNumber = newAccountNumber.replace(/[^\d-]/g, ''); // removing all letters from string
    newAccountNumber = newAccountNumber.replace('-', '');

    return newAccountNumber.substring(0, 5); // returns first 5 strings
  }

  /**
   * Make an account transaction adding money to it, simulating a PUT request to the API
   * @param accountId The account ID
   * @param amount The amount to be added
   */
  addMoneyToAccount(accountId: number, amount: number): IAccount | undefined {
    const account = this.accounts.find((account) => account.id === accountId);
    if (!account) return;

    account.balance += amount;
    return account;
  }

  /**
   * Transfer money from account to another
   * @param currentAccount The current account that money will be taken
   * @param accountToNumber The account number that will receive money
   * @param amount The amount of value that will be transfered
   */
  transferMoneyAccount(currentAccount: IAccount, accountToNumber: string, amount: number): IAccount | undefined {
    const accountTo = this.accounts.find((account) => account.accountNumber === accountToNumber);
    if (!accountTo) return;

    currentAccount.balance -= amount;
    accountTo.balance += amount;

    return currentAccount;
  }
}
