import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlCashBoxComponent } from './components/control-cash-box/control-cash-box.component';
import { HistorySalesComponent } from './components/history-sales/history-sales.component';

const routes: Routes = [
  { component: HistorySalesComponent, path: 'history-sales' },
  {component: ControlCashBoxComponent, path:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
