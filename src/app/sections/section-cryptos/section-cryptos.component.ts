import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';
import { delay } from 'q';
import { LineChartComponent } from 'src/app/charts/line-chart/line-chart.component';

@Component({
  selector: 'app-section-cryptos',
  templateUrl: './section-cryptos.component.html',
  styleUrls: ['./section-cryptos.component.css']
})
export class SectionCryptosComponent implements OnInit {

  // lineChartInputData: any[] = [
  //   { data: [1, 2, 3], label: 'Test123'},
  // ];

  lineChartInputData: any[];
  hColumn: any;

  constructor(private _cryptoDataService: CryptoDataService) { }

  buttonAdd: any;
  buttonRemove: any;

  cryptos: any;
  cryptosWallet: Crypto;

  priceToChart: any[];
  c24h: any;

  ngOnInit() {
      this._cryptoDataService.getCryptosAPI().subscribe(res => {
      this.cryptos = res;
      });

      setTimeout(() => {
          this._cryptoDataService.getCryptos().subscribe(res => {
            this.cryptos = res;
            });
       }, 3000);

  }
 
  onClickAdd(idCrypto, rank, name, symbol, price, change24h, change7d) {
    console.log('test add');
    this.buttonAdd = document.getElementById(rank)
    console.log(this.buttonAdd);
    this.buttonAdd.disabled = true;

    this.buttonRemove = document.getElementById(rank+""+rank);
    console.log(this.buttonRemove);
    this.buttonRemove.disabled = false;
    
    this._cryptoDataService.addToWalletFlag(rank,1).subscribe();
    this._cryptoDataService.addToWallet(idCrypto, rank, name, symbol, price, change24h, change7d);
  }

  onClickRemove(rank) {
    console.log('test remove');
    this.buttonRemove = document.getElementById(rank+""+rank);
    console.log(this.buttonRemove);
    this.buttonRemove.disabled = true;

    this.buttonAdd = document.getElementById(rank);
    console.log(this.buttonAdd);
    this.buttonAdd.disabled = false;
    this._cryptoDataService.addToWalletFlag(rank,0).subscribe();  
    this._cryptoDataService.removeFromWallet(rank).subscribe();
  }

  chartDataOnClick(price, change24h, change7d) {
    // console.log(this.lineChartInputData)
    console.log(price, change24h, change7d)
    this.lineChartInputData = this.calculatePriceToChart(price, change24h, change7d);
  };

  calculatePriceToChart(price, h, d) {   
    // console.log(parseFloat(price.replace(",",".")).toFixed(2));
    // console.log(parseFloat(h.replace(",",".")).toFixed(2));
    // console.log(parseFloat(d.replace(",",".")).toFixed(2));
  
    price = parseFloat(price.replace(",",".")).toFixed(2);
    var priceh = parseFloat(price.replace(",","."))/(1+parseFloat(h.replace(",","."))/100);
    var priced = parseFloat(price.replace(",","."))/(1+parseFloat(d.replace(",","."))/100);


    this.priceToChart = [
      { data: [priced.toFixed(2), priceh.toFixed(2), price], label: 'test'},
      // { data: [priced.toFixed(2), priceh.toFixed(2), price], label: 'test2'},
    ];

    console.log(this.priceToChart);
    return this.priceToChart;
  } 
  

}
