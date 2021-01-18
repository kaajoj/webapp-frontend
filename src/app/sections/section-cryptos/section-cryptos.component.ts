import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service';
import { delay } from 'q';
import { LineChartComponent } from 'src/app/charts/line-chart/line-chart.component';
import { AuthorizeService } from '../../../api-authorization/authorize.service';

@Component({
  selector: 'app-section-cryptos',
  templateUrl: './section-cryptos.component.html',
  styleUrls: ['./section-cryptos.component.css']
})
export class SectionCryptosComponent implements OnInit {
  public isAuthenticated: boolean;
  public userId: string;

  // lineChartInputData: any[] = [
  //   { data: [1, 2, 3], label: 'Test123'},
  // ];

  lineChartInputData: any[];
  hColumn: any;

  constructor(private _cryptoDataService: CryptoDataService, private authorizeService: AuthorizeService) { }

  buttonAdd: any;
  buttonRemove: any;

  cryptos: any;
  cryptosUser: any;
  cryptosWallet: Crypto;

  priceToChart: any[];
  c24h: any;

  ngOnInit() {
    this._cryptoDataService.getCryptosAPI().subscribe();

    setTimeout(() => {
      this._cryptoDataService.getCryptos().subscribe(
        res => {
          this.cryptos = res;
        }); 
    }, 2000);
    
    // setTimeout(() => {
    //   this._cryptoDataService.getCryptosAPI().subscribe((res: any[]) => {
    //       for (let i = 0; i < res.length; i++) {
    //         if(this.cryptos[i].symbol == res[i].symbol) {
    //           this.cryptos[i].price = res[i].price;
    //           this.cryptos[i].change7d = res[i].change7d;
    //           this.cryptos[i].change24h = res[i].change24h;
    //           this.cryptos[i].price = res[i].price;
    //           console.log(this.cryptos[i]);
    //         }
    //       }
    //     });
    // }, 1000);

    this.authorizeService.isAuthenticated().subscribe( value => {
      this.isAuthenticated = value;
    });

    setTimeout(() => {
      console.log(this.isAuthenticated);
      if(this.isAuthenticated){
        this.authorizeService.getUser().subscribe(data => {
          this.userId = data['sub'];
          this._cryptoDataService.GetWalletByUserId(this.userId).subscribe(res => {
            this.cryptosUser = res;
            console.log(this.cryptosUser);
            
            // this.cryptos.forEach(element => {
            //   element += ["test", 3];
            //   element = ["test2", 4];
            // });
            // console.log(this.cryptos);
          });
        });
        // else block onClickAdd()
      }
   }, 3000);

    // setTimeout(() => {
    //   this._cryptoDataService.getWallet().subscribe(res => {
    //     console.log(res);
    //     this.cryptosUser = Object.keys(res).map(function(index){
    //       let idCrypto = res[index].idCrypto;
    //       let userId = res[index].userId;
    //       let cryptosUser = new Array; 
    //       cryptosUser[0]= idCrypto;
    //       cryptosUser[1] = userId;
    //       return cryptosUser;
    //     })
    //     console.log(this.cryptosUser);

    //     this.cryptos.forEach(element => {
    //       element += ["test", 3];
    //     });
    //     console.log(this.cryptos);
    //   });
    // }, 2000);
  }
 
  onClickAdd(idCrypto, rank, name, symbol, price, change24h, change7d, id) {
    this.buttonAdd = document.getElementById(rank)
    // console.log(this.buttonAdd);
    this.buttonAdd.disabled = true;

    this.buttonRemove = document.getElementById(rank+""+rank);
    // console.log(this.buttonRemove);
    this.buttonRemove.disabled = false;
    this._cryptoDataService.addToWallet(idCrypto, rank, name, symbol, price, change24h, change7d, id, this.userId);
  }

  onClickRemove(rank) {
    this.buttonRemove = document.getElementById(rank+""+rank);
    console.log(this.buttonRemove);
    this.buttonRemove.disabled = true;

    this.buttonAdd = document.getElementById(rank);
    console.log(this.buttonAdd);
    this.buttonAdd.disabled = false;

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
