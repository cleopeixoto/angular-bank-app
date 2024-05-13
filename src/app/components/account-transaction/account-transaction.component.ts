import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { ClientService } from '../../services/client.service';
import { IAccount, transactionTypes } from '../../interfaces/account';
import { IClient } from '../../interfaces/client';

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrl: './account-transaction.component.scss'
})
export class AccountTransactionComponent implements OnInit {
  @Input() transactionType!: string;
  @Input() currentAccount!: IAccount;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  transactionTypes = transactionTypes;
  availableClients!: IClient[];
  displayNotification: boolean | any = false;
  accountDropdownOpened = false; // Flag to handle dropdown opening

  accountForm: FormGroup = this.formBuilder.group({
    amount: [0, [Validators.required, Validators.min(0)]],
    selectedAccountNumber: ['#'],
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.availableClients = this.clientService.clients.filter((client) => client.accountNumber !== this.currentAccount.accountNumber);

    // Sort alphabetically
    this.availableClients = this.availableClients.sort((clientA, clientB) => {
      if (clientA.name.toUpperCase() > clientB.name.toUpperCase()) return 1;
      if (clientA.name.toUpperCase() < clientB.name.toUpperCase()) return -1;
      return 0; // equals
    });

    if (this.transactionType === this.transactionTypes.transferMoney) {
      this.accountForm.controls['selectedAccountNumber'].setValidators(Validators.required);
    }
  }

  /**
   * Get current account's balance
   * @returns The account's balance amount
   */
  getBalance(): number {
    return this.currentAccount.balance;
  }

  /**
   * Format amount value to 2-decimal
   */
  onAmountChange() {
    this.accountForm.controls['amount'].setErrors(null);
    const amount = this.accountForm.controls['amount'].value;
    const formattedAmount = Number(amount).toFixed(2);
    this.accountForm.controls['amount'].setValue(formattedAmount);

    if (this.transactionType === transactionTypes.transferMoney && amount > this.getBalance()) {
      this.accountForm.controls['amount'].setErrors({ balanceError: true });
    }
  }

  /**
   * Close dropdown when clicking again on it (defect fix)
   * @param dropdownElement The dropdown element
   */
  onAccountChange(dropdownElement: any) {
    this.accountDropdownOpened = !this.accountDropdownOpened;
    if (!this.accountDropdownOpened) dropdownElement.close();
  }

  /**
   * Disable submit button according to conditions
   * @returns A boolean value indicating if submit button should be disabled or not
   */
  disableSubmit(): boolean {
    return this.accountForm.invalid || this.accountForm.untouched || Number(this.accountForm.controls['amount'].value) === 0;
  }

  /**
   * Notify parent of canceling transaction
   */
  onCancel(): void {
    this.accountForm.reset();
    this.notifyParent.emit();
  }

  /**
   * Submit (PUT) transaction
   * @returns 
   */
  onSubmit(): void {
    this.displayNotification = false;

    if (this.accountForm.invalid) return;

    const data = this.accountForm.value;
    const amount = Number(data.amount);

    let updatedAccount: IAccount | undefined;
    if (this.transactionType === transactionTypes.addMoney) {
      updatedAccount = this.accountService.addMoneyToAccount(this.currentAccount.id, amount);
    } else if (this.transactionType === transactionTypes.transferMoney) {
      updatedAccount = this.accountService.transferMoneyAccount(this.currentAccount, data.selectedAccountNumber, amount);
    }

    const displayNotification = {
      isGeneric: true,
      isSuccess: !!updatedAccount,
      title: !updatedAccount ? 'Error' : 'Success',
      subtitle: '',
    };

    if (updatedAccount) {
      displayNotification.subtitle = this.transactionType === transactionTypes.addMoney 
        ? 'Your money was successfully added!' : `Your money was successfully transfered to account #${data.selectedAccountNumber}!`;
    } else {
      displayNotification.subtitle = 'Something went wrong with your transaction';
    }

    this.notifyParent.emit(displayNotification);
  }
}
