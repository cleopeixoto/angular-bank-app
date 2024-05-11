import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import {Location} from '@angular/common';

/**
 * Enum for the available modes
 */
enum ClientMode {
  CREATE = 1,
  READ = 2, // default
  UPDATE = 3,
}

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent implements OnInit {
  clientId!: number;
  clientMode = ClientMode.READ;
  hasCustomError = false;

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
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params?.['id'];

    // New client
    if (!id) {
      this.clientMode = ClientMode.CREATE;
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
    if (!currentClient) console.error('Client not found')  // Handle error

    this.clientForm.setValue({
      name: currentClient?.name || '',
      email: currentClient?.email || '',
      age: currentClient?.age || '',
      accountNumber: currentClient?.account?.accountNumber || '',
    });
  }

  /**
   * Submit form in order to creating a client or updating it
   */
  onSubmit(): void {
    if (!this.clientForm.valid) {
      this.hasCustomError = true;
      return;
    }

    // Get client form data
    const clientData = this.clientForm.value;

    // Create new client: send client data to POST
    if (this.clientMode === ClientMode.CREATE) {
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
   * Back to previous page
   */
  onCancel(): void {
    this.location.back();
  }
  
  /**
   * Go to home page, application default route
   */
  goToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
