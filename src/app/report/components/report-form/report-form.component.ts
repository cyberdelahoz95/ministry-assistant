import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DailyReport } from '../../../models/report.model';
import { MAReportFormValidators } from '../../utils/Validators';

@Component({
    selector: 'ma-report-form',
    templateUrl: './report-form.component.html',
    styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
    isNew = true;
    isReadOnly = false;
    @Input()
    set dailyReport(dailyReport: DailyReport | null) {
        if (dailyReport) {
            this.isNew = false;
            this.isReadOnly = true;
            this.reportForm.patchValue(dailyReport);
            const isFieldMinistryReport = dailyReport.serviceTime > 0;
            this.reportForm.patchValue({ isFieldMinistryReport });
        }
    }
    @Output() onReportSubmit = new EventEmitter<DailyReport>();
    @Output() onReportDelete = new EventEmitter();

    reportForm: UntypedFormGroup;
    areMinistryServiceFieldVisible: boolean = true;

    constructor(private formBuilder: UntypedFormBuilder) {
        this.formBuilder = formBuilder;

        this.reportForm = this.formBuilder.group(
            {
                date: [''],
                isFieldMinistryReport: [true],
                serviceTime: [0, [Validators.min(0)]],
                otherServiceTime: [0, [Validators.min(0)]],
                publications: [0, [Validators.min(0)]],
                videos: [0, [Validators.min(0)]],
                returnVisits: [0, [Validators.min(0)]],
                notes: ['', [Validators.min(0)]],
            },
            {
                validators: [MAReportFormValidators.hasValidServiceTimeSet],
            }
        );
    }

    ngOnInit(): void {}

    submitReport() {
        if (this.reportForm?.valid) {
            let dailyReportRequest = {
                ...this.reportForm.value,
            };
            delete dailyReportRequest.isFieldMinistryReport;
            this.onReportSubmit.emit(dailyReportRequest);
        } else {
            this.reportForm?.markAllAsTouched();
        }
    }

    submitDelete() {
        this.onReportDelete.emit();
    }

    toggleReadOnly() {
        this.isReadOnly = !this.isReadOnly;
    }

    get isFieldMinistryReport() {
        return this.reportForm.get('isFieldMinistryReport')?.value;
    }
}
