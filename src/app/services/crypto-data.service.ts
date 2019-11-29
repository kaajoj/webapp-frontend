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

  // getOrdersByCustomer(n: number) {
  //   return this._http.get('http://localhost:5000/api/order/bycustomer/' + n)
  //     .map(res => res.json());
  // }

}