import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AccountTransactionComponent } from './components/account-transaction/account-transaction.component';

registerLocaleData(ptBr);
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientDetailsComponent,
    NotificationComponent,
    AccountTransactionComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ]
})
export class AppModule { }