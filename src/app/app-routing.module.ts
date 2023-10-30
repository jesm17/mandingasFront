import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlCashBoxComponent } from './components/control-cash-box/control-cash-box.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
