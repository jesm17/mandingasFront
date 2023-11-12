import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlCashBoxComponent } from './components/control-cash-box/control-cash-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CashBoxComponent } from './components/cash-box/cash-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HistorySalesComponent } from './components/history-sales/history-sales.component';
import { NgChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
const importModules = [
  MatButtonModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  HttpClientModule,
  MatIconModule,
  NgChartsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
];
@NgModule({
  declarations: [
    AppComponent,
    ControlCashBoxComponent,
    CashBoxComponent,
    HistorySalesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    importModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
