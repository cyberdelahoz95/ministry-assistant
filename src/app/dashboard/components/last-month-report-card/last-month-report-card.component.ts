import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    MonthlyReport,
    MonthlyReportUpdateRequest,
} from 'src/app/models/report.model';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ma-last-month-report-card',
    templateUrl: './last-month-report-card.component.html',
    styleUrls: ['./last-month-report-card.component.scss'],
})
export class LastMonthReportCardComponent implements OnInit, OnChanges {
    @Input() lastMonthReport: MonthlyReport | null = null;
    @Output() onGenerateMonthlyReportRequested = new EventEmitter();
    @Output() onUpdateMonthlyReportRequested = new EventEmitter();

    isEditMode: boolean = false;
    bibleStudiesFormControl = new FormControl();
    notesFormControl = new FormControl();

    constructor() {}

    ngOnInit(): void {}

    submitGenerateMonthlyReportRequest() {
        this.onGenerateMonthlyReportRequested.emit();
    }

    updateMonthlyReportRequest() {
        var monthlyReportUpdateRequest: MonthlyReportUpdateRequest = {
            id: this.lastMonthReport?.id,
            bibleStudies: this.bibleStudiesFormControl.value,
            notes: this.notesFormControl.value,
        };
        this.onUpdateMonthlyReportRequested.emit(monthlyReportUpdateRequest);
        this.toggleEditMode();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.lastMonthReport.currentValue) {
            const bs = changes.lastMonthReport.currentValue.bibleStudies;
            const notes = changes.lastMonthReport.currentValue.notes;
            this.bibleStudiesFormControl.setValue(bs);
            this.notesFormControl.setValue(notes);
        }
    }

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
    }
}
