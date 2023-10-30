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
}
