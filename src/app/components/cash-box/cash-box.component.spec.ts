import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBoxComponent } from './cash-box.component';

describe('CashBoxComponent', () => {
  let component: CashBoxComponent;
  let fixture: ComponentFixture<CashBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashBoxComponent]
    });
    fixture = TestBed.createComponent(CashBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
