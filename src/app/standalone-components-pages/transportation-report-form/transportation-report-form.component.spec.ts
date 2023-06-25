import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationReportFormComponent } from './transportation-report-form.component';

describe('TransportationReportFormComponent', () => {
  let component: TransportationReportFormComponent;
  let fixture: ComponentFixture<TransportationReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TransportationReportFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportationReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
