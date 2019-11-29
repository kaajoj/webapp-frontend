import { Routes } from '@angular/router'
import { SectionSalesComponent } from './app/sections/section-sales/section-sales.component';
import { SectionCryptosComponent } from './app/sections/section-cryptos/section-cryptos.component';
import { SectionWalletComponent } from './app/sections/section-wallet/section-wallet.component';

export const appRoutes: Routes = [
    {path: 'cryptos', component: SectionCryptosComponent},
    {path: 'wallet', component: SectionWalletComponent},
    {path: 'sales', component: SectionSalesComponent},

    {path: '', redirectTo: '/cryptos', pathMatch: 'full'},
];