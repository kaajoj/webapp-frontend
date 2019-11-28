import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';

@Component({
  selector: 'app-section-cryptos',
  templateUrl: './section-cryptos.component.html',
  styleUrls: ['./section-cryptos.component.css']
})
export class SectionCryptosComponent implements OnInit {

  constructor(private _cryptoDataService: CryptoDataService) { }

  cryptos: Crypto[];

  ngOnInit() {
    this._cryptoDataService.getCryptos().subscribe(res => {
      this.cryptos = res;
    });
  }

}
