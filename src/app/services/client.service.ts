import { Injectable } from '@angular/core';
import { IClient } from '../interfaces/IClient';
import { clients } from '../clientsMock';
import { AccountService } from './account.service';

/**
 * Interface of a Client Data Object - used to POST and PUT requests
 * Since it's a new client (no account created yet) or an editing of user fields,
 * no account object (fk) needed, and accountNumber is optional (editing mode)
 */
interface IClientData {
  name: string;
  email: string;
  age: number | string;
  accountNumber?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: IClient[] = clients;

  constructor(
    private accountService: AccountService
  ) { }

  /**
   * Get all clients, simulating a GET request to the API
   * @returns List of current clients
   */
  getClients() {
    return this.clients;
  }

  /**
   * Get a client by its id, simulating a GET request to the API
   * @param id The ID of the client
   * @returns The client object
   */
  getClient(id: number) {
    console.log('clientId', id);
    return this.clients.find((client) => client.id === id);
  }

  /**
   * Create a client by its id, simulating a POST request to the API
   * @param data The data information of the new client
   * @returns The new client object
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createClient(clientData: IClientData) {
    const newClientObj = this.handleCreation();
    const newClient = {
      ...clientData,
      ...newClientObj,
    }
    this.clients.push(newClient);

    return newClient;
  }

  /**
   * Simulate backend inclusion of a new item on db
   * @param data 
   */
  handleCreation() {
    // Simulate creation of a new client id and a new account id (according to biggest value)
    const clientIds = this.clients.map((client) => client.id);
    const newClientId = Math.max(...clientIds);

    const accountIds = this.accountService.accounts.map((account) => account.id);
    const newAccountId = Math.max(...accountIds);

    // Simulate a new account with no money yet
    const newAccount = {
      id: newAccountId,
      accountNumber: this.accountService.generateAccountNumber(),
      balance: 0,
      status: 'positive',
    }

    // Create a New Account
    return { id: newClientId, account: newAccount };
  }

  /**
   * Update a client, simulating a PUT request to the API
   * @param data The data information to be overriten
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateClient(clientId: number, clientData: IClientData) {
    const client = this.getClient(clientId);
    if (!client) return;

    client.name = clientData.name || client.name;
    client.email = clientData.email || client.email;
    client.age = clientData.age || client.age;

    return client;
  }

  /**
   * Delete a client by its id, simulating a DELETE request to the API
   * @param id The ID of the client
   */
  deleteClient(id: number): void {
    const inx = this.clients.findIndex((client) => client.id === id);
    if (inx) this.clients.splice(inx, 1);
  }
}
