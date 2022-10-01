import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordsEqualityValidatorDirective } from './directives/passwords-equality-validator.directive';

import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        PasswordsEqualityValidatorDirective,
        RegisterFormComponent,
        LoginFormComponent,
    ],
    providers: [],
    imports: [
        CommonModule,
        UserRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class UserModule {}
