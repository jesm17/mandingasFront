import { Component, OnInit } from '@angular/core';
import { CashBoxService } from 'src/app/services/cashBox/cash-box.service';

@Component({
  selector: 'app-control-cash-box',
  templateUrl: './control-cash-box.component.html',
  styleUrls: ['./control-cash-box.component.css'],
})
export class ControlCashBoxComponent implements OnInit {
  constructor(private cashBoxService: CashBoxService) {}

  ngOnInit(): void {
    this.getActiveCashBox();
  }

  text: string = '';
  isOpen: boolean = false;
  isDisable: boolean = false;
  idCashBox: string = '';

  changeStatusBoxCash() {
    if (this.isOpen == true) {
      this.text = 'cerrar';
      //this.isOpen = true;
    } else {
      this.isOpen = false;
      this.text = 'abrir';
    }
    console.log(this.isOpen);
  }

  getActiveCashBox() {
    this.cashBoxService.getActiveCashBox().subscribe((res: any) => {
      this.idCashBox = res._id;
      this.isOpen = res.isOpen;
      console.log(res);
      console.log(this.isOpen, this.idCashBox);
    });
    this.changeStatusBoxCash()
  }
}
