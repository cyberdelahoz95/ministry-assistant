import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { NotificationType } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { LoginRequest } from '../../../shared/services/user/user.model';
import { UserService } from '../../../shared/services/user/user.service';

import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

const { home } = environment.pages;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(
        private titleService: Title,
        private userService: UserService,
        private router: Router,
        private notificationService: NotificationService,
        private loaderService: LoaderService
    ) {
        this.titleService.setTitle('Welcome to Ministry Assistant 🔑');
        //Disabling loader spinner
        this.loaderService.adjustLoaderVisibility(false);
    }

    ngOnInit(): void {}

    async handleSubmit(loginRequest: LoginRequest): Promise<void> {
        const signInRes = await this.userService.authenticate(loginRequest);
        if (!signInRes.error) {
            this.router.navigate([home]);
        } else {
            this.notificationService.notify({
                title: 'Oh Oh 😕',
                type: NotificationType.danger,
                message: signInRes.error.message,
            });
        }
    }
}
