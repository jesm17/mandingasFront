import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CashBoxService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  getActiveCashBox() {
    return this.http.get(`${this.apiUrl}boxCash`);
  }

  createCashBox() {
    return this.http.post(`${this.apiUrl}boxCash`, null);
  }

  closeCashBox(id: string | null) {
    return this.http.put(`${this.apiUrl}boxCash/${id}`, null);
  }

  getHistory() {
    return this.http.get(`${this.apiUrl}boxCash/history`);
  }

  getfilter(year: number | string, month: number | string) {
    return this.http.get(`${this.apiUrl}boxCash/history`, {
      params: {
        year: year,
        month: month,
      },
    });
  }
}
