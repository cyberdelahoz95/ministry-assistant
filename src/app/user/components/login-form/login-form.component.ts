import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    UntypedFormBuilder,
    FormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { LoginRequest } from '../../../shared/services/user/user.model';

@Component({
    selector: 'ma-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
    @Output() onLoginSubmit = new EventEmitter<LoginRequest>();
    loginForm: UntypedFormGroup;

    constructor(private formBuilder: UntypedFormBuilder) {
        this.formBuilder = formBuilder;
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {}

    loginSubmit(): void {
        if (
            this.loginForm.get('username')?.valid &&
            this.loginForm.get('password')?.valid
        ) {
            let loginRequest: LoginRequest = {
                password: this.loginForm.get('password')?.value,
                email: this.loginForm.get('username')?.value,
            };
            this.onLoginSubmit.emit(loginRequest);
        }
    }

    get isUsernameInvalid() {
        return (
            !this.loginForm.get('username')?.valid &&
            this.loginForm.get('username')?.touched
        );
    }

    get isPasswordInvalid() {
        return (
            !this.loginForm.get('password')?.valid &&
            this.loginForm.get('password')?.touched
        );
    }

    get isFormInValid() {
        return !(
            this.loginForm.get('username')?.valid &&
            this.loginForm.get('password')?.valid
        );
    }

    get usernameField() {
        return this.loginForm.get('username');
    }

    get passwordField() {
        return this.loginForm.get('password');
    }
}
