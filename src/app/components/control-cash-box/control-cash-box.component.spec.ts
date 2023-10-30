import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCashBoxComponent } from './control-cash-box.component';

describe('ControlCashBoxComponent', () => {
  let component: ControlCashBoxComponent;
  let fixture: ComponentFixture<ControlCashBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlCashBoxComponent]
    });
    fixture = TestBed.createComponent(ControlCashBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
