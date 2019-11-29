import { Routes } from '@angular/router'
import { SectionSalesComponent } from './app/sections/section-sales/section-sales.component';
import { SectionCryptosComponent } from './app/sections/section-cryptos/section-cryptos.component';

export const appRoutes: Routes = [
    {path: 'sales', component: SectionSalesComponent},
    {path: 'cryptos', component: SectionCryptosComponent},

    {path: '', redirectTo: '/cryptos', pathMatch: 'full'},
];