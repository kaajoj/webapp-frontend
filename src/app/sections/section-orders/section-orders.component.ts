import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/order';
import { CryptoDataService } from '../../services/crypto-data.service'; 

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor(private _salesDataService: CryptoDataService) { }
  
  orders: Order[];

  ngOnInit() {
    this._salesDataService.getOrders().subscribe(res => {
      this.orders = res;
    });
  }

}
