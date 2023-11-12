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
  icon!:string
  changeStatusBoxCash() {
    if (this.isOpen == false) {
      this.cashBoxService.createCashBox().subscribe((res: any) => {
        this.idCashBox = res._id;
        localStorage.setItem('idCashBox', this.idCashBox);
        this.isOpen = res.isOpen;
        this.getTextToCashBox(this.isOpen);
        console.log(res);
      });
    } else {
   
      const id: string | null = localStorage.getItem('idCashBox')
        ? localStorage.getItem('idCashBox')
        : '';
      this.cashBoxService.closeCashBox(id).subscribe((res) => {
        console.log(res);
        localStorage.removeItem('idCashBox');
        this.isOpen = false;
        this.getTextToCashBox(this.isOpen);
      });
    }
    //console.log(this.isOpen);
  }

  getActiveCashBox() {
    this.cashBoxService.getActiveCashBox().subscribe(
      (res: any) => {
        if (res == null) {
          this.getTextToCashBox(false);
        } else {
        
          localStorage.setItem('idCashBox',res._id);
          this.idCashBox = res._id;
          this.isOpen = res.isOpen;
      
          this.getTextToCashBox(res.isOpen);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTextToCashBox(status: boolean) {
    if (status === true) {
      this.text = 'Cerrar';
      this.icon = 'remove_shopping_cart'
    } else {
      this.text = 'Abrir';
      this.icon = 'add_shopping_cart';
    }
  }
}
