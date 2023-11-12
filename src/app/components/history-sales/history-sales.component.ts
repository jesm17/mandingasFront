import { Component, OnInit, ViewChild } from '@angular/core';
import { CashBoxService } from 'src/app/services/cashBox/cash-box.service';

import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, Validators } from '@angular/forms';

interface HistorySales {
  month: string;
  day: number;
  sale: number;
  open: string;
  close: string;
}

const ELEMENT_DATA: HistorySales[] = [];

@Component({
  selector: 'app-history-sales',
  templateUrl: './history-sales.component.html',
  styleUrls: ['./history-sales.component.css'],
})
export class HistorySalesComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.cahsBox.paginator = this.paginator;
    this.cahsBox.sort = this.sort;
  }
  constructor(private boxCahsService: CashBoxService) {}
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getUTCMonth() + 1;
  selectFormControl = new FormControl();
  year = new FormControl(this.currentYear, [
    Validators.minLength(4),
    Validators.maxLength(4),
    Validators.max(this.currentYear),
  ]);
  monthNames: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  displayedColumns: string[] = [
    'position',
    'Mes',
    'Dia',
    'Vendido',
    'Abierto',
    'Cerrado',
  ];

  toQuery: any = {
    day: null,
    month: null,
    year: null,
  };

  month!: number;

  cahsBox = new MatTableDataSource<HistorySales>();

  totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  ngOnInit(): void {
    this.getHistory();
  }
  getHistory() {
    this.boxCahsService.getHistory().subscribe((res: any) => {
 
      this.lineChartData.labels = this.monthNames;
      res.forEach((x: any, i: number) => {
        let cm = x.monthNumber;
        let totalSale = this.totals[cm - 1];

        totalSale += x.totalSales;
        this.totals[cm - 1] = totalSale;
      });
      this.cahsBox.data = res;
      this.chart?.update();
    });
  }

  getSalesOfMonth() {
    const date = new Date();
  }
  getFilterDate() {
    this.month = this.selectFormControl.value;

    this.boxCahsService.getfilter('', this.month).subscribe(
      (res: any) => {
        console.log(res);

        this.cahsBox.data = res;
      },
      (err) => {
        console.log(err);
      }
    );
    //console.log(this.setToQuery(null, this.month, 5));
  }

  resetChart() {
    this.totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.getHistory();
    this.selectFormControl.reset();
  }

  setToQuery(
    year: number | null = null,
    month: number | null = null,
    day: number | null = null
  ): string {
    let string = '';
    if (year) {
      string += `year=${year}`;
    }
    if (month) {
      string += `month=${month}`;
    }

    if (day) {
      string += `day=${day}`;
    }

    return string;
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.monthNames,
    datasets: [
      {
        data: this.totals,
        label: 'Vendido en el mes',
        fill: 'origin',
        tension: 0.2,
        backgroundColor: '#f89f63b7',
        pointBackgroundColor: '#f57d6e',
        borderColor: '#f45d48',
      },
    ],
  };

  public lineChartLegend = false;
}
