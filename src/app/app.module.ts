import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { SectionCryptosComponent } from './sections/section-cryptos/section-cryptos.component';
import { SectionWalletComponent, Dialog, DialogAlertDown, DialogAlertUp } from './sections/section-wallet/section-wallet.component';

// Services
import { CryptoDataService } from './services/crypto-data.service'; 

import {appRoutes} from '../routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LineChartComponent,
    PieChartComponent,
    SectionCryptosComponent,
    SectionWalletComponent,
    Dialog,
    DialogAlertUp,
    DialogAlertDown,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
  ],
  entryComponents: [
    Dialog,
    DialogAlertUp,
    DialogAlertDown,
  ],
  providers: [
    CryptoDataService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }