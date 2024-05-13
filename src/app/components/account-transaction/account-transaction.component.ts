import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrl: './account-transaction.component.scss'
})
export class AccountTransactionComponent {
  @Input() transactionType!: string;

}
