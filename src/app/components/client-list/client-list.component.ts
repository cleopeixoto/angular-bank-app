import { Component, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/IClient';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  clients: IClient[] = [];

  constructor(
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.clients = this.clientService.getClients();
  }

  /**
   * Delete a client, with a pop-up
   * @param id Client id
   */
  confirmDelete(id: number) {
    this.clientService.deleteClient(id);
  }
}
