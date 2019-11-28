import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service'; 
import * as moment from 'moment';

// const LINE_CHART_SAMPLE_DATA: any[] = [
//   { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis'},
//   { data: [12, 18, 26, 13, 28, 26], label: 'Image Recognition'},
//   { data: [52, 34, 49, 53, 68, 62], label: 'Forecasting'},
// ];
// const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const LINE_CHART_COLORS = [
  // {
  //   backgroundColor: 'rgba(6, 214, 160, 0.2)',
  //   borderColor: 'rgba(0, 200, 140, 0.5)',
  //   pointBackgroundColor: '#000',
  //   pointBorderColor: '#000',
  //   pointHoverBackgroundColor: '#555',
  //   pointHoverBorderColor: '#555'
  // },
  {
    backgroundColor: 'rgba(255, 209, 102, 0.2)',
    borderColor: 'rgba(240, 180, 89, 0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555'
  },
  {
    backgroundColor: 'rgba(15, 78, 133, 0.2)',
    borderColor: 'rgba(3, 64, 128, 0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555'
  },
];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private _salesDataService: CryptoDataService) { }

  topCustomers: string[];
  allOrders: any[];

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any = {
    responsive: true
  };

  lineChartLegend: true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit() {
    this._salesDataService.getOrders().subscribe(res => {
      this.allOrders = res;

      this._salesDataService.getOrdersByCustomer(3).subscribe(cus => {
        this.topCustomers = cus.map(x => x['name']);

        const allChartData = this.topCustomers.reduce((result, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, []);

        let dates = allChartData.map(x => x['data']).reduce((a, i) => {
          a.push(i.map(o => new Date(o[0])));
          return a;
        }, []);

        dates = [].concat.apply([], dates);
        // console.log('dates:', dates);

        const r = this.getCustomerOrdersByDate(allChartData, dates)['data'];
        console.log('r:', r);

        this.lineChartLabels = r[0]['orders'].map(o => o['date']);

        this.lineChartData = [
          { 'data': r[0].orders.map(x => x.total), 'label': r[0]['customer']},
          // { 'data': r[1].orders.map(x => x.total), 'label': r[1]['customer']},
          // { 'data': r[2].orders.map(x => x.total), 'label': r[2]['customer']}
        ];

      });
    });
  }

  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter(o => o.customer.name === name);
    // console.log('name:', name, 'customerOrders:', customerOrders);

    const formattedOrders = customerOrders.reduce((r, e) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);

    // console.log('formattedOrders:', formattedOrders);
    const result = { customer: name, data: formattedOrders };

    // console.log('result:', result);
    return result;
  }

  getCustomerOrdersByDate(orders: any, dates: any) {
    // for each customer -> for each date =>
    // { data: [{'customer': 'XYZ', 'orders': [{ 'date': '17-11-25', total: 2421}, {}]}, {}, {}]}
    const customers = this.topCustomers;
    const prettyDates = dates.map(x => this.toFriendlyDate(x));
    const u = Array.from(new Set(prettyDates)).sort();
    // console.log(u);

    // define our result object to return:
    const result = {};
    const dataSets = result['data'] = [];

    customers.reduce((x, y, i) => {
      // console.log('Reducing:', y, 'at index:', i);
      const customerOrders = [];
      dataSets[i] = {
        customer: y, orders:
        u.reduce((r, e, j) => {
          const obj = {};
          obj['date'] = e;
          obj['total'] = this.getCustomerDateTotal(e, y); // sum total orders for this customer on this day
          customerOrders.push(obj);
          // console.log('Reducing:', e, 'at index:', j, 'customerOrders', customerOrders);
          return customerOrders;
        })
      };
      return x;
    }, []);

    return result;
  }

  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('YY-MM-DD');
  }

  getCustomerDateTotal(date: any, customer: string) {
    const r = this.allOrders.filter(o => o.customer.name === customer
      && this.toFriendlyDate(o.placed) === date);

    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return result;
  }
}