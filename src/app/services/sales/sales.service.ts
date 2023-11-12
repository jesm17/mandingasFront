import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from 'src/app/interfaces/sale/sale';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private url: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  day: string = '65358088f3d6ed984ef79303';
  saveSale(sale: Sale) {
    return this.http.post(`${this.url}sales`, sale);
  }

  getSales() {
    const id = localStorage.getItem('idCashBox')
      ? localStorage.getItem('idCashBox')
      : '';
    return this.http.get(`${this.url}sales/id/${id}`);
  }

  deleteSale(id: string) {
    return this.http.delete(`${this.url}sales/${id}`);
  }

  getOneSales(id: string) {
    return this.http.get(`${this.url}sales/${id}`);
  }

  updateSale(id: string, sale: Sale) {
    return this.http.put(`${this.url}sales/${id}`, sale);
  }
}
