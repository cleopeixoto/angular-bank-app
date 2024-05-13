import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { IAccount } from '../../interfaces/account';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  @Input() genericNotification = false;
  @Input() isSuccess = false;
  @Input() title = '';
  @Input() subtitle = '';

  @Input() accountNumber = '';
  @Output() closeNotification: EventEmitter<any> = new EventEmitter();

  currentAccount!: IAccount;
  isPositiveBalance = true;

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    if (!this.accountNumber) return;

    const account = this.accountService.getAccountByNumber(this.accountNumber);
    if (account) {
      this.currentAccount = account;
      this.isPositiveBalance = this.currentAccount.status === 'positive';
    }
  }

  /**
   * Close notification popup
   */
  onClose(): void {
    this.closeNotification.emit();
  }
}
