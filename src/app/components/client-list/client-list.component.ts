import { Component } from '@angular/core';
import { IClient } from '../../interfaces/IClient';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  clients: IClient[] = [];
}
