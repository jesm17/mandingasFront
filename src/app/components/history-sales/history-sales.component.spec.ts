import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySalesComponent } from './history-sales.component';

describe('HistorySalesComponent', () => {
  let component: HistorySalesComponent;
  let fixture: ComponentFixture<HistorySalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorySalesComponent]
    });
    fixture = TestBed.createComponent(HistorySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
