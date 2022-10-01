import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMonthReportCardComponent } from './last-month-report-card.component';

describe('LastMonthReportCardComponent', () => {
  let component: LastMonthReportCardComponent;
  let fixture: ComponentFixture<LastMonthReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastMonthReportCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMonthReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
