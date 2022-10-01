import { Component, OnInit } from '@angular/core';
import { debounceTime, map, tap } from 'rxjs/operators';
import {
    MaNotification,
    NotificationType,
} from 'src/app/models/notification.model';

import { NotificationService } from '../../services/notification/notification.service';

@Component({
    selector: 'ma-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    showNotification: boolean = false;
    incommingNotification: MaNotification = {
        title: '',
        message: '',
        type: NotificationType.danger,
    };

    constructor(private notificationService: NotificationService) {}

    ngOnInit(): void {
        this.notificationService.notifyRequest$
            .pipe(
                tap((notification: MaNotification) => {
                    this.incommingNotification = notification;
                    this.showNotification = true;
                }),
                debounceTime(3000),
                tap(() => {
                    this.showNotification = false;
                })
            )
            .subscribe();
    }
}
