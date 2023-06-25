import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TransportationReport } from 'src/app/models/transportation-report.model';

@Component({
    selector: 'ma-transportation-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
    ],
    templateUrl: './transportation-form.component.html',
    styleUrls: ['./transportation-form.component.scss'],
})
export class TransportationFormComponent implements OnInit {
    isNew = true;
    isReadOnly = false;
    @Input()
    set transportationReport(
        transportationReport: TransportationReport | null
    ) {
        if (transportationReport) {
            this.isNew = false;
            this.isReadOnly = true;
            this.reportForm.patchValue(transportationReport);
        }
    }
    @Output() onReportSubmit = new EventEmitter<TransportationReport>();
    @Output() onReportDelete = new EventEmitter();

    reportForm: FormGroup;

    constructor() {
        this.reportForm = new FormGroup({
            date: new FormControl(''),
            description: new FormControl('', [Validators.min(0)]),
            cost: new FormControl(0, [Validators.min(0)]),
        });
    }

    ngOnInit(): void {}

    submitReport() {
        if (this.reportForm?.valid) {
            let transportationReportRequest = {
                ...this.reportForm.value,
            };
            delete transportationReportRequest.isFieldMinistryReport;
            this.onReportSubmit.emit(transportationReportRequest);
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
