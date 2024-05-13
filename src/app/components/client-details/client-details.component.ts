import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Location } from '@angular/common';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent implements OnInit {
  clientId!: number;
  clientModes = {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
  }
  clientMode: number;
  currentClient: any;
  currentAccount: any;
  customErrors = {
    existingClient: false,
    invalidForm: false,
  };
  displayNotification: boolean | any = false;
  transactions = {
    transferMoney: false,
    addMoney: false,
  }

  clientForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.maxLength(150)]],
    accountNumber: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private accountService: AccountService,
    public location: Location
  ) {
    this.clientMode = this.clientModes.READ; // default option
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params?.['id'];

    // New client
    if (!id) {
      this.clientMode = this.clientModes.CREATE;
      return;
    }

    // Existing client
    this.clientId = id;
    this.setCurrentFormValues();
    this.currentAccount = this.accountService.getAccountByNumber(this.currentClient.accountNumber);
  }

  /**
   * In case of an existing client, get client's data
   */
  setCurrentFormValues(): void {
    const currentClient = this.clientService.getClient(this.clientId);
    if (!currentClient) {
      console.error('Client not found')  // Handle error
      return;
    }
    
    this.currentClient = currentClient;

    this.clientForm.setValue({
      name: currentClient?.name ?? '',
      email: currentClient?.email ?? '',
      age: currentClient?.age ?? '',
      accountNumber: currentClient?.accountNumber ?? '',
    });
  }

  /**
   * Submit form in order to creating a client or updating it
   */
  onSubmit(): void {
    if (!this.clientForm.valid) return;

    // Get client form data
    const clientData = this.clientForm.value;

    // Create new client: send client data to POST
    if (this.clientMode === this.clientModes.CREATE) {
      delete clientData.accountNumber;  // Since it's a new client, the account will be post created
      this.clientService.createClient(clientData);
        
      this.goToHome();
      return;
    }

    // Edit client mode: Send client to PUT
    this.clientService.updateClient(this.clientId, clientData);
    this.goToHome();
  }

  /**
   * Check if given email already exists
   * @param email Given email
   */
  onEmailChange(email: string) {
    const existingEmail = this.clientService.clients.find((client) => client.email === email);

    // Updating form email control
    if (!existingEmail) delete this.clientForm.controls['email'].errors?.['existingClient'];
    else this.clientForm.controls['email'].setErrors({ existingEmail: true });
  }

  /**
   * Check if is there any custom error
   * @returns Return true if there's a custom error. False if it isn't
   */
  hasCustomErrors(): boolean {
    return Object.values((this.customErrors)).some((error) => !!error);
  }

  /**
   * Action when canceling a transaction
   */
  onCancel(): void {
    this.clientForm.reset();

    if (this.clientMode === this.clientModes.UPDATE) {
      this.clientMode = this.clientModes.READ;
      this.clientForm.markAsUntouched();

      // Reset form values to originals
      this.clientForm.controls['name'].setValue(this.currentClient.name);
      this.clientForm.controls['email'].setValue(this.currentClient.email);
      this.clientForm.controls['age'].setValue(this.currentClient.age);
    }
    else this.location.back();
  }

  /**
   * Change transaction view to Client READ page view
   */
  endTransaction(notificationEvent: any): void {
    this.displayNotification = notificationEvent;

    this.transactions.addMoney = false;
    this.transactions.transferMoney = false;
    this.clientMode = this.clientModes.READ;
  }
  
  /**
   * Go to home page, application default route
   */
  goToHome(): void {
    this.router.navigate(['/home']).then();
  }

  /**
   * Trigger the content according with the type of transaction
   * @param transactionType the type of transaction: add money or transfer money
   */
  onClickTransactions(transactionType: string): void {
    Object.keys((this.transactions)).forEach((transaction) => {
      this.transactions[transaction] = transaction === transactionType;
    });  }
}
