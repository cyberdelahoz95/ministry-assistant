import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[appPasswordsEqualityValidator]',
})
export class PasswordsEqualityValidatorDirective {
    static arePasswordsEqual(control: AbstractControl) {
        return control.get('password')?.value ===
            control.get('confirmPassword')?.value
            ? null
            : { mismatch: true };
    }
    // other validatinos can be added here as static methods of this class
}
