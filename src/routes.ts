import { Routes } from '@angular/router'
import { SectionCryptosComponent } from './app/sections/section-cryptos/section-cryptos.component';
import { SectionWalletComponent } from './app/sections/section-wallet/section-wallet.component';

export const appRoutes: Routes = [
    {path: 'cryptos', component: SectionCryptosComponent},
    {path: 'wallet', component: SectionWalletComponent},

    {path: '', redirectTo: '/cryptos', pathMatch: 'full'},
];