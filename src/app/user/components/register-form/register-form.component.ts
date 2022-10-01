import { Component, EventEmitter, Output } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { PasswordsEqualityValidatorDirective } from 'src/app/user/directives/passwords-equality-validator.directive';
import { RegisterUserRequest } from 'src/app/shared/services/user/user.model';

@Component({
    selector: 'ma-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
    @Output() onRegisterSubmit = new EventEmitter<RegisterUserRequest>();
    registerForm: UntypedFormGroup;

    constructor(private formBuilder: UntypedFormBuilder) {
        this.formBuilder = formBuilder;

        this.registerForm = this.formBuilder.group(
            {
                name: ['', [Validators.required]],
                username: ['', [Validators.required, Validators.email]],
                password: new UntypedFormControl('', [
                    Validators.required,
                    Validators.minLength(4),
                ]),
                confirmPassword: new UntypedFormControl('', [Validators.required]),
            },
            {
                validators: [
                    PasswordsEqualityValidatorDirective.arePasswordsEqual,
                ],
            }
        );
    }

    onSubmitRegistration(): void {
        if (this.registerForm.valid) {
            let registerUserRequest: RegisterUserRequest = {
                confirmPassword: this.passwordConfirmationField?.value,
                password: this.passwordField?.value,
                name: this.nameField?.value,
                email: this.usernameField?.value,
            };
            this.onRegisterSubmit.emit(registerUserRequest);
        }
    }

    get isPasswordValid() {
        return !this.registerForm.valid && this.registerForm.touched;
    }

    get passwordField() {
        return this.registerForm.get('password');
    }

    get passwordConfirmationField() {
        return this.registerForm.get('confirmPassword');
    }

    get usernameField() {
        return this.registerForm.get('username');
    }

    get nameField() {
        return this.registerForm.get('name');
    }
}
