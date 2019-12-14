import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CryptoDataService {
  tempCrypto: any;

  constructor(private _http: Http) { }

  getCryptos() {
    return this._http.get('http://localhost:5000/api/crypto/')
      .map(res => res.json());
  }

  getCryptosSingle(n: number) {
    return this._http.get('http://localhost:5000/api/crypto/' + n)
      .map(res => res.json());
  }

  getCryptosAPI() {
    return this._http.get('http://localhost:5000/api/crypto/getcmcapi')
      .map(res => res.json());
  }

  // WALLET

    getWallet() {
      return this._http.get('http://localhost:5000/api/wallet/')
        .map(res => res.json());
    }

    addToWallet(idCrypto: number, rank: number, name: string, symbol: string, price: string, change24h: string, change7d: string) {
    return this._http.post('http://localhost:5000/api/wallet/',
    {
      "id": idCrypto,
      "rank": rank,
      "name": name,
      "symbol": symbol,
      "price": price,
      "oldprice": price,
      "change24h": change24h,
      "change7d": change7d,
      "ownFlag": "1", 
      "quantity": "0",
      "sum":"0",
      "alertUp":"0",
      "alertDown":"0"
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
      .map(res => res.json());
  }

  // Old function
  addToWalletFlag(n: number, flag: number) {                           
    return this._http.get('http://localhost:5000/api/crypto/edit/' + n + "/own/" + flag)
      .map(res => res.json());
  }

  editQuantity(n: number, quantity: string) {
    return this._http.get('http://localhost:5000/api/wallet/edit/' + n + "/quantity/" + quantity)
      .map(res => res.json());
  }

  setAlertUp(n: number, alertUp: string) {
    return this._http.get('http://localhost:5000/api/wallet/edit/' + n + "/alertup/" + alertUp)
      .map(res => res.json());
  }

  setAlertDown(n: number, alertDown: string) {
    return this._http.get('http://localhost:5000/api/wallet/edit/' + n + "/alertdown/" + alertDown)
      .map(res => res.json());
  }

  updateWalletPrices() {
    return this._http.get('http://localhost:5000/api/wallet/edit/prices/')
      .map(res => res.json());
  }

}