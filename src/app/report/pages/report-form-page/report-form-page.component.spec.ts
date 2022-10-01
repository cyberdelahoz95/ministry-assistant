import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFormPageComponent } from './report-form-page.component';

describe('ReportFormPageComponent', () => {
    let component: ReportFormPageComponent;
    let fixture: ComponentFixture<ReportFormPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReportFormPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportFormPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
