import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SectionSalesComponent } from './sections/section-sales/section-sales.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { SectionCryptosComponent } from './sections/section-cryptos/section-cryptos.component';

// Services
import { CryptoDataService } from './services/crypto-data.service'; 

import {appRoutes} from '../routes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SectionSalesComponent,//r
    LineChartComponent,
    PieChartComponent,
    SectionCryptosComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    HttpModule
  ],
  providers: [
    CryptoDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }