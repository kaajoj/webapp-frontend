import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CryptoDataService {
  tempCrypto: any;

  constructor(private _http: HttpClient) { }

  getCryptos() {
    return this._http.get('http://localhost:5000/api/crypto/')
  }

  getCryptosSingle(n: number) {
    return this._http.get('http://localhost:5000/api/crypto/' + n)
  }

  getCryptosAPI() {
    return this._http.get('http://localhost:5000/api/crypto/getcmcapi')
  }

  // WALLET

    getWallet() {
      return this._http.get('http://localhost:5000/api/wallet/')
    }

    addToWallet(idCrypto: number, rank: number, name: string, symbol: string, price: string, change24h: string, change7d: string) {
    return this._http.post('http://localhost:5000/api/wallet/',
    {
      "idcrypto": idCrypto,
      "rank": rank,
      "name": name,
      "symbol": symbol,
      "price": price,
      "oldprice": price,
      "change24h": change24h,
      "change7d": change7d,
      "ownFlag": 1, 
      "quantity": "0",
      "sum":"0",
      "alertUp":"20",
      "alertDown":"10"
      })
      .subscribe(
        data  => {
        console.log("POST Request is successful ", data);
        },
        error  => {
        
        console.log("Error", error);    
        });
  }

  removeFromWallet(n: number) {
      return this._http.delete('http://localhost:5000/api/wallet/delete/' + n)
  }

  // Old function
  addToWalletFlag(n: number, flag: number) {                           
    return this._http.get('http://localhost:5000/api/crypto/edit/' + n + "/own/" + flag)
  }

  editQuantity(n: number, quantity: string) {
    return this._http.get('http://localhost:5000/api/wallet/edit/' + n + "/quantity/" + quantity)
  }

  setAlertUp(n: number, alertUp: string) {
    return this._http.get('http://localhost:5000/api/wallet/edit/' + n + "/alertup/" + alertUp)
  }

  setAlertDown(n: number, alertDown: string) {
    return this._http.get('http://localhost:5000/api/wallet/edit/' + n + "/alertdown/" + alertDown)
  }

  updateWalletPrices() {
    return this._http.get('http://localhost:5000/api/wallet/edit/prices/')
  }

}