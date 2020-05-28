import { Routes } from '@angular/router'
import { SectionCryptosComponent } from './app/sections/section-cryptos/section-cryptos.component';
import { SectionWalletComponent } from './app/sections/section-wallet/section-wallet.component';
import { AuthorizeGuard } from './api-authorization/authorize.guard';

export const appRoutes: Routes = [
    {
        path: 'cryptos',
        component: SectionCryptosComponent
    },
    {
        path: 'wallet',
        component: SectionWalletComponent,
        canActivate: [AuthorizeGuard]
    },

    {path: '', redirectTo: '/cryptos', pathMatch: 'full'},
];