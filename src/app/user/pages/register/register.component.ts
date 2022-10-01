import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UserService } from '../../../shared/services/user/user.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';

import { RegisterUserRequest } from '../../../shared/services/user/user.model';
import { NotificationType } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

const { home } = environment.pages;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    constructor(
        private titleService: Title,
        private userService: UserService,
        private router: Router,
        private notificationService: NotificationService,
        private loaderService: LoaderService
    ) {
        this.titleService.setTitle('Sign up 💼👜');
        //Disabling loader spinner
        this.loaderService.adjustLoaderVisibility(false);
    }

    async handleSubmit(
        registerUserRequest: RegisterUserRequest
    ): Promise<void> {
        try {
            const signUpRes = await this.userService.register(
                registerUserRequest
            );
            if (!signUpRes.error) {
                this.router.navigate([home]);
            } else {
                this.notificationService.notify({
                    title: 'Oh Oh 😕',
                    type: NotificationType.danger,
                    message: signUpRes.error.message,
                });
            }
        } catch (error) {
            console.log({ error });
        }
    }
}
