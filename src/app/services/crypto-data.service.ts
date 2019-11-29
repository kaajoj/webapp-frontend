import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CryptoDataService {

  constructor(private _http: Http) { }

  getCryptos() {
    return this._http.get('http://localhost:5000/api/crypto/')
      .map(res => res.json());
  }

  getCryptosAPI() {
    return this._http.get('http://localhost:5000/api/crypto/getcmcapi')
      .map(res => res.json());
  }

  // addToWallet() {
  //   return this._http.post('http://localhost:5000/api/crypto/', 1)
  //     .map(res => res.json());
  // }
  getWallet(n: number) {
    return this._http.get('http://localhost:5000/api/crypto/getcryptowallet/' + n)
      .map(res => res.json());
  }

  // getOrdersByCustomer(n: number) {
  //   return this._http.get('http://localhost:5000/api/order/bycustomer/' + n)
  //     .map(res => res.json());
  // }

}