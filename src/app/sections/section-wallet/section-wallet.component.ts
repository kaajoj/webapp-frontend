import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';

@Component({
  selector: 'app-section-wallet',
  templateUrl: './section-wallet.component.html',
  styleUrls: ['./section-wallet.component.css']
})
export class SectionWalletComponent implements OnInit {

  cryptoData: any; // pie chart

  constructor(private _cryptoDataService: CryptoDataService) { }

  cryptos: Crypto[];

  ngOnInit() {
    this._cryptoDataService.getCryptos().subscribe(res => {
      this.cryptoData = res;
    });

    this._cryptoDataService.getWallet(1).subscribe(res => {
      this.cryptos = res;
    });
  }

}
