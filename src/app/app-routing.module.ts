import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';

export const DEFAULT_ROUTE = '/home';

const routes: Routes = [
  { path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full' },
  { path: 'home', component: ClientListComponent },
  { 
    path: 'client',
    children: [
      { path: 'new', component: ClientDetailsComponent },
      { path: ':id/details', component: ClientDetailsComponent },
    ]
   },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
