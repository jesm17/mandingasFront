import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  dataSource = new MatTableDataSource<Sale>;

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

  idToUpdate!: string;

  ngOnInit(): void {
    this.getSaleOfDay();
  }

  getSaleOfDay() {
    this.saleService.getSales().subscribe(
      (res: any) => {
        this.dataSource.data = res;

        this.dataToDisplay = res;

        this.getTotalOfSales();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // getActiveCashBox(){
  //   try {
  //     this.id_boxCash = localStorage.getItem('idCashBox')
  //   } catch (error) {

  //   }
  // }

  addSale() {
    const id = localStorage.getItem('idCashBox')
      ? localStorage.getItem('idCashBox')
      : '';
    const sale: Sale = {
      value: this.formForSale.value.valueSale,
      clientName: this.formForSale.value.clientName,
      time: '',
      boxCahsId: id,
    };

    let date = new Date();

    sale.time =
      date.toLocaleDateString() + ' ' + date.toLocaleTimeString('es-CO');

    this.saleService.saveSale(sale).subscribe((res: any) => {
      this.dataToDisplay = [...this.dataToDisplay, res];
      this.dataSource.data = this.dataToDisplay;
      this.getTotalOfSales();

      this.restoreSale();
    });
  }

  getTotalOfSales() {
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
    this.saleService.deleteSale(i).subscribe({
      next(value) {
        console.log(value);
      },
    });
    this.getTotalOfSales();
  }

  getOneSale(id: string) {
    this.saleService.getOneSales(id).subscribe(
      (res: any) => {
        this.valueSale.setValue(res.value);
        this.clientName.setValue(res.clientName);
        this.idToUpdate = id;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateSale() {
    let date = new Date();

    let filter: any = [];
    const id = localStorage.getItem('idCashBox')
      ? localStorage.getItem('idCashBox')
      : '';
    const sale: Sale = {
      value: this.formForSale.value.valueSale,
      clientName: this.formForSale.value.clientName,
      time: '',
      boxCahsId: id,
      _id: this.idToUpdate,
    };

    sale.time =
      date.toLocaleDateString() + ' ' + date.toLocaleTimeString('es-CO');

    this.dataToDisplay.filter((x: any) => {
      if ((x._id != sale._id) == true) {
        filter.push(x);
      }
    });

    this.dataToDisplay = filter;

    this.dataToDisplay = [...this.dataToDisplay, sale];

    this.dataSource.data = this.dataToDisplay;

    this.restoreSale();

    this.getTotalOfSales();

    this.idToUpdate = '';

    this.saleService.updateSale(sale._id!, sale).subscribe((res) => {
      console.log(res);
    });
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

  restoreSale() {
    this.formForSale.reset();
    this.valueSale.setValue(0);
  }
}
