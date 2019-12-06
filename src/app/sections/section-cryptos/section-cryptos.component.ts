import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-section-cryptos',
  templateUrl: './section-cryptos.component.html',
  styleUrls: ['./section-cryptos.component.css']
})
export class SectionCryptosComponent implements OnInit {

  lineChartData: any;

  constructor(private _cryptoDataService: CryptoDataService) { }

  // disFlag = false;
  buttonAdd: any;
  buttonRemove: any;

  cryptos: Crypto[];
  priceToChart: any[];

  ngOnInit() {
    this._cryptoDataService.getCryptos().subscribe(res => {
      this.cryptos = res;
    });
    // this._cryptoDataService.getCryptosAPI().subscribe(res => {
    //   this.cryptos = res;
    // });
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

    this._cryptoDataService.addToWallet(id,1).subscribe();
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
    this._cryptoDataService.addToWallet(id,0).subscribe();
  }

  chartDataOnClick(price, change24h, change7d) {
    console.log(price, change24h, change7d)
    this.calculatePriceToChart(price, change24h, change7d);
    // this._cryptoDataService  // teraz w crypto-data.service dodać funkcje 
    // get po symbolu i pobrac !!!!!!!!!!! JEDNAK NIE, przecież te dane już mam na frontcie
    // wystarczy pobrać zamiast symboli price, change24 7d, napisać tutaj funkcjie do obliczen ceny 
    // dla 24 i 7 i przekazanie tego do grafu
  };

  calculatePriceToChart(price, h, d) {
    // /100;
    // price += 1;
    
    console.log(parseFloat(price.replace(",",".")).toFixed(2));
    console.log(parseFloat(h.replace(",",".")).toFixed(2));
    console.log(parseFloat(d.replace(",",".")).toFixed(2));
  
    price = parseFloat(price.replace(",",".")).toFixed(2);
    var priceh = parseFloat(price.replace(",","."))/parseFloat(h.replace(",","."));
    var priced = parseFloat(price.replace(",","."))/parseFloat(d.replace(",","."));

    // const LINE_CHART_PRICE_DATA: any[] = [
    //   { data: [7484, 7300, 7269], label: 'Price Graph'},
    //   // { data: [100, 50, 250], label: 'Price Graph 2'},
    // ];

    this.priceToChart = [
      price, priceh.toFixed(2), priced.toFixed(2)
    ];

    console.log(this.priceToChart);
    return this.priceToChart;
  } 
  

}
