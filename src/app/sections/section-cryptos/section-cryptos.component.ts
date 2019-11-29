import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';

@Component({
  selector: 'app-section-cryptos',
  templateUrl: './section-cryptos.component.html',
  styleUrls: ['./section-cryptos.component.css']
})
export class SectionCryptosComponent implements OnInit {

  constructor(private _cryptoDataService: CryptoDataService) { }

  // disFlag = false;
  buttonAdd: any;
  buttonRemove: any;

  cryptos: Crypto[];

  ngOnInit() {
    this._cryptoDataService.getCryptos().subscribe(res => {
      this.cryptos = res;
    });
  }

  onClickAdd(id) {
    console.log('test add');
    this.buttonAdd = document.getElementById(id)
    console.log(this.buttonAdd);
    this.buttonAdd.disabled = true;

    this.buttonRemove = document.getElementById(id+""+id);
    console.log(this.buttonRemove);
    this.buttonRemove.disabled = false;
    // this.disFlag = true;
  }

  onClickRemove(id) {
    console.log('test remove');
    this.buttonRemove = document.getElementById(id+""+id);
    console.log(this.buttonRemove);
    this.buttonRemove.disabled = true;

    this.buttonAdd = document.getElementById(id)
    console.log(this.buttonAdd);
    this.buttonAdd.disabled = false;
    // this.disFlag = false;
  }
  

}
