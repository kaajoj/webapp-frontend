import { Component, OnInit, Input } from '@angular/core';
import { CryptoDataService } from '../../services/crypto-data.service'; 
import _ from 'lodash';

// const LINE_CHART_SAMPLE_DATA: any[] = [
//   { data: [7484, 7300, 7269], label: 'Price Graph'},
// { data: [100, 50, 250], label: 'Price Graph 2'},
// ];
const LINE_CHART_LABELS: string[] = ['-7d', '-24h', 'Now'];

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
    backgroundColor: 'rgba(255, 209, 102, 0.4)',
    borderColor: 'rgba(240, 180, 89, 0.5)',
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

  @Input() lineChartInputData: any;
  lineChartData: any[];
  // lineChartData: any = LINE_CHART_SAMPLE_DATA;
  // lineChartLabels: any;
  lineChartLabels: any = LINE_CHART_LABELS;

  lineChartOptions: any = {
    responsive: true
  };

  lineChartLegend: true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  
  ngOnInit() {
    this.drawChart();
  }

  drawChart() {
    this.lineChartData = this.lineChartInputData;
  }

}