import { Component, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/IClient';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  clients: IClient[] = [];

  constructor(
    private router: Router,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.clients = this.clientService.getClients();
  }

  /**
   * Sort clients alphabetically
   */
  sortedClients() {
    return this.clients.sort((clientA, clientB) => {
      const nameA = clientA.name.toUpperCase();
      const nameB = clientB.name.toUpperCase();

      if (nameA > nameB) return 1;
      if (nameA < nameB) return -1;
      return 0; // equals
    });
  }

  /**
   * Delete a client, with a pop-up
   * @param id Client id
   */
  confirmDelete(id: number) {
    this.clientService.deleteClient(id);
  }

  goToClientDetails(clientId: number) {
    this.router.navigate([`client/${clientId}/details`]).then();
  }
}
