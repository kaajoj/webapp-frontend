import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';

@Component({
  selector: 'app-section-wallet',
  templateUrl: './section-wallet.component.html',
  styleUrls: ['./section-wallet.component.css']
})
export class SectionWalletComponent implements OnInit {

  constructor(private _cryptoDataService: CryptoDataService) { }

  cryptos: Crypto[];

  ngOnInit() {
    // this._cryptoDataService.getCryptos().subscribe(res => {
    //   this.cryptos = res;
    // });
  }

}
