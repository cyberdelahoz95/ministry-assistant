import { AbstractControl } from '@angular/forms';

export class MAReportFormValidators {
    static hasValidServiceTimeSet(reportForm: AbstractControl) {
        if (reportForm.get('isFieldMinistryReport')?.value == true) {
            return reportForm.get('serviceTime')?.value > 0
                ? null
                : { notValidServiceTime: true };
        } else {
            return reportForm.get('otherServiceTime')?.value > 0
                ? null
                : { notValidServiceTime: true };
        }
    }
    // other validatinos can be added here as static methods of this class
}
