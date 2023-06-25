import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationFormComponent } from './transportation-form.component';

describe('TransportationFormComponent', () => {
  let component: TransportationFormComponent;
  let fixture: ComponentFixture<TransportationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
