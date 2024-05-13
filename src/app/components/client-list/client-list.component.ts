import { Component, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  clients: IClient[] = [];
  currentSortField = 'name';

  constructor(
    private router: Router,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.clients = this.clientService.getClients();
    this.sortBy('name');
  }

  /**
   * Sort clients array based on a given property (field)
   * @param field Given field to sort based on
   */
  sortBy(field: string) {
    this.currentSortField = field;

    this.clients.sort((clientA, clientB) => {
      let keyA = clientA[field];
      let keyB = clientB[field];

      if (typeof keyA === 'string') keyA = keyA.toUpperCase();
      if (typeof keyB === 'string') keyB = keyB.toUpperCase();

      if (keyA > keyB) return 1;
      if (keyA < keyB) return -1;
      return 0; // equals
    });
  }

  /**
   * Delete a client
   * @param id Client id
   */
  confirmDelete(id: number) {
    this.clientService.deleteClient(id);
  }

  /**
   * Go to Client Details page
   * @param clientId The ID of the client
   */
  goToClientDetails(clientId: number) {
    this.router.navigate([`client/${clientId}/details`]).then();
  }
}
