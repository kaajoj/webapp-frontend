import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';

const theme = 'Default';

const THEME_COLORS = [
  {
    name: 'Default',
    colorSet: [
        '#26547c',//b
        '#ffd166',//y
        '#06d6a0',//g
        '#083d77',//bb
        '#ee964b',//o
        '#ff6b6b',//r
        '#fcfcfc']//w       
  }
];

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  Total: any;
  sum: any;

  constructor() { }

  @Input() inputData: any;
  @Input() limit: number;

  pieChartData: number[];
  pieChartLabels: string[];
  colors: any[] = [
    {
      backgroundColor: this.themeColors(theme),
      borderColor: '#111'
    }
  ];
  pieChartType = 'pie';

  ngOnInit() {
    this.parseChartData(this.inputData, this.limit)
  }

  parseChartData(res: any, limit?: number) {
    const allData = res.slice(0, limit);
    console.log(allData);
    // this.pieChartData = allData.map(x => _.values(x)[1]);
    // this.pieChartLabels = allData.map(x => _.values(x)[0]);
    // console.log(allData.map(x => parseInt(_.values(x)[9])));
    this.pieChartData = allData.map(x => parseInt(_.values(x)[9]));
    this.Total = allData.map(x => parseFloat(_.values(x)[9].replace(",",".")))
    this.pieChartLabels = allData.map(x => _.values(x)[3]);
    this.calculateTotal();
  }

  themeColors(setName: string): string[] {
    const c = THEME_COLORS.slice(0)
    .find(set => set.name === setName).colorSet;

    return c;
  }

  calculateTotal(){
    this.sum = this.Total.reduce(function(a, b) { return a + b; }, 0);
    this.sum = this.sum.toFixed(2).replace(".",",");
    // console.log(this.sum);
  }
}
