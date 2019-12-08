import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class CryptoDataService {
  [x: string]: any;

  constructor(private _http: Http) { }

  getCryptos() {
    return this._http.get('http://localhost:5000/api/crypto/')
      .map(res => res.json());
  }

  getCryptosAPI() {
    return this._http.get('http://localhost:5000/api/crypto/getcmcapi')
      .map(res => res.json());
  }

  addToWallet(n: number, flag: number) {
    return this._http.get('http://localhost:5000/api/crypto/edit/' + n + "/own/" + flag)
      .map(res => res.json());
  }

  editQuantity(n: number, quantity: string) {
    return this._http.get('http://localhost:5000/api/crypto/edit/' + n + "/quantity/" + quantity)
      .map(res => res.json());
  }

  setAlertUp(n: number, alertUp: string) {
    return this._http.get('http://localhost:5000/api/crypto/edit/' + n + "/alertup/" + alertUp)
      .map(res => res.json());
  }

  setAlertDown(n: number, alertDown: string) {
    return this._http.get('http://localhost:5000/api/crypto/edit/' + n + "/alertdown/" + alertDown)
      .map(res => res.json());
  }

  // addToWallet2(crypto: Crypto): Observable<Crypto> {
  //   return this._http.post<Crypto>('http://localhost:5000/api/crypto/')
  //     .pipe(
  //       catchError(this.handleError('addToWallet', crypto))
  //     );
  // }

  //  addToWallet3() {
  //   return this._http.post('http://localhost:5000/api/crypto/',
  //   {
  //     "idCrypto":30,
  //     "rank":1,
  //     "name":"XXX",
  //     "symbol":"YYY",
  //     "price":"7257,82",
  //     "change24h":"0,70",
  //     "change7d":"-3,82",
  //     "ownFlag":1,
  //     "quantity":"0,1",
  //     "sum":"725,782"
  //     })
  //     .subscribe(
  //       data  => {
  //       console.log("POST Request is successful ", data);
  //       },
  //       error  => {
        
  //       console.log("Error", error);    
  //       });
  // }

  getWallet() {
    return this._http.get('http://localhost:5000/api/crypto/getcryptowallet')
      .map(res => res.json());
  }

  // getOrdersByCustomer(n: number) {
  //   return this._http.get('http://localhost:5000/api/order/bycustomer/' + n)
  //     .map(res => res.json());
  // }

}