import { Routes } from '@angular/router'
import { SectionSalesComponent } from './app/sections/section-sales/section-sales.component';
import { SectionOrdersComponent } from './app/sections/section-orders/section-orders.component';
import { SectionCryptosComponent } from './app/sections/section-cryptos/section-cryptos.component';

export const appRoutes: Routes = [
    {path: 'sales', component: SectionSalesComponent},
    {path: 'orders', component: SectionOrdersComponent},
    {path: 'cryptos', component: SectionCryptosComponent},

    {path: '', redirectTo: '/cryptos', pathMatch: 'full'},
];