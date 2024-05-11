import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { IAccount } from '../interfaces/IAccount';

export enum AccountStatus {
  NEGATIVE,
  POSITIVE
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: IAccount[] = [];

  constructor() { }

  /**
   * Get an account by its number, simulating a GET request to the API
   * @param accountNumber The number of the account
   * @returns The account
   */
  getAccount(accountNumber: string) {
    return this.accounts.find((account) => account.accountNumber === accountNumber);
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
}
