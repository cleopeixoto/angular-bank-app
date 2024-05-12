import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import {Location} from '@angular/common';

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
  customErrors = {
    existingClient: false,
    invalidForm: false,
  };

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
    if (!this.clientForm.valid) {
      this.customErrors.invalidForm = true;
      return;
    }

    // Get client form data
    const clientData = this.clientForm.value;

    // Create new client: send client data to POST
    if (this.clientMode === this.clientModes.CREATE) {
      delete clientData.accountNumber;  // Since it's a new client, the account will be post created
      const newClient = this.clientService.createClient(clientData);
      if (!newClient)
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
    this.customErrors.existingClient = !!existingEmail;
  }

  /**
   * Check if is there any custom error
   * @returns Return true if there's a custom error. False if it isn't
   */
  hasCustomErrors(): boolean {
    return Object.values((this.customErrors)).some((error) => !!error);
  }

  /**
   * Reset all custom errors
   */
  resetCustomErrors(): void {
    this.customErrors.existingClient = false;
    this.customErrors.invalidForm = false;
  }

  /**
   * Action when canceling an operation
   */
  onCancel(): void {
    this.resetCustomErrors();

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
   * Go to home page, application default route
   */
  goToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
