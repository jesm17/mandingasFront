import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, ReplaySubject } from 'rxjs';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Sale } from 'src/app/interfaces/sale/sale';
import { SalesService } from 'src/app/services/sales/sales.service';

const ELEMENT_DATA: Sale[] = [];
@Component({
  selector: 'app-cash-box',
  templateUrl: './cash-box.component.html',
  styleUrls: ['./cash-box.component.css'],
})
export class CashBoxComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private saleService: SalesService) {
    this.dataSource.data = ELEMENT_DATA;
  }

  displayedColumns: string[] = [
    'position',
    'clientName',
    'value',
    'time',
    'actions',
  ];

  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new MatTableDataSource<Sale>();

  totalSales: number = 0;

  valueSale: FormControl = new FormControl(0, [
    Validators.required,
    Validators.min(2000),
  ]);

  clientName: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
  ]);

  formForSale = new FormGroup({
    clientName: this.clientName,
    valueSale: this.valueSale,
  });

  ngOnInit(): void {
    this.getSaleOfDay();
  }

  getSaleOfDay() {
    this.saleService.getSales().subscribe(
      (res: any) => {
        this.dataSource.data = res;

        this.dataToDisplay = res;
        console.log(this.dataToDisplay);
        this.getTotalSales();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addSale() {
    const sale: Sale = {
      value: this.formForSale.value.valueSale,
      clientName: this.formForSale.value.clientName,
      time: '',
      boxCahsId: '65358088f3d6ed984ef79303',
    };

    let date = new Date();

    sale.time =
      date.toLocaleDateString() + ' ' + date.toLocaleTimeString('es-CO');

    this.dataToDisplay = [...this.dataToDisplay, sale];

    this.dataSource.data = this.dataToDisplay;

    this.getTotalSales();

    this.formForSale.reset();

    this.valueSale.setValue(0);

    this.saleService.saveSale(sale).subscribe({
      next(res) {
        console.log(res);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  getTotalSales() {
    this.totalSales = 0;
    this.dataToDisplay.forEach((x: any) => (this.totalSales += x.value));
  }

  deleteSale(i: any) {
    let sale = this.dataToDisplay.find((x: any) => x._id == i);
    //console.log(sale);
    let filter: any = [];
    this.dataToDisplay.filter((x: any) => {
      if ((x != sale) == true) {
        filter.push(x);
      }
    });
    // console.log(filter);
    this.dataToDisplay = filter;
    this.dataSource.data = this.dataToDisplay;
    this.getTotalSales();
  }

  messageErrorValue() {
    let text;
    if (this.valueSale.hasError('required')) {
      text = 'Este campo es requerido';
    }
    if (this.valueSale.hasError('min')) {
      text = `El valor minimo es $2000`;
    }
    return text;
  }
  messageErrorClient() {
    let text;

    if (this.clientName.hasError('required')) {
      text = 'Este campo es requerido';
    }
    if (this.clientName.hasError('minlength')) {
      text = `Minimo 3 caracteres`;
    }

    return text;
  }

  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    let val = this.valueSale.value;
    if (
      val != 0 &&
      val !== null &&
      !this.valueSale.errors &&
      !this.clientName.errors
    ) {
      this.addSale();
    }
  }
}
