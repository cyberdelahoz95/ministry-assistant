import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSampleDataComponent } from './generate-sample-data.component';

describe('GenerateSampleDataComponent', () => {
  let component: GenerateSampleDataComponent;
  let fixture: ComponentFixture<GenerateSampleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateSampleDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateSampleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
