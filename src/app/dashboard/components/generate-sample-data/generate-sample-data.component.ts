// TODO Can this component be included only in development environment??

import { Component, OnInit } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { DailyReportCreateRequest } from 'src/app/models/report.model';
import startOfMonth from 'date-fns/startOfMonth';
import addDays from 'date-fns/addDays';
import { ReportService } from 'src/app/report/services/report.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { Title } from '@angular/platform-browser';
import { NotificationType } from 'src/app/models/notification.model';

@Component({
    selector: 'ma-generate-sample-data',
    templateUrl: './generate-sample-data.component.html',
    styleUrls: ['./generate-sample-data.component.scss'],
})
export class GenerateSampleDataComponent implements OnInit {
    sampleDataGeneratorForm: UntypedFormGroup;

    constructor(
        private reportService: ReportService,
        private notificationService: NotificationService,
        private titleService: Title,
        private formBuilder: UntypedFormBuilder
    ) {
        this.titleService.setTitle('Welcome to Ministry Assistant');

        this.formBuilder = formBuilder;

        this.sampleDataGeneratorForm = this.formBuilder.group({});
    }

    ngOnInit(): void {}

    generateData() {
        var dailyReportCreateRequests: DailyReportCreateRequest[] = [];
        var quantity = Math.floor(Math.random() * 29);
        console.log('geenrating sample data');
        for (let index = 0; index < quantity; index++) {
            var dayOfTheMonth = Math.floor(Math.random() * 20) + 1;
            const reportDate = addDays(
                startOfMonth(new Date()),
                dayOfTheMonth * -1
            );
            dailyReportCreateRequests.push({
                notes: `This is note number ${index}`,
                otherServiceTime: Math.floor(Math.random() * 10),
                publications: Math.floor(Math.random() * 10),
                returnVisits: Math.floor(Math.random() * 10),
                serviceTime: Math.floor(Math.random() * 10),
                videos: Math.floor(Math.random() * 10),
                date: reportDate.toDateString(),
            });
        }

        this.reportService
            .postManyDailyReports(dailyReportCreateRequests)
            .then((postDailyReportResponse: any) => {
                if (postDailyReportResponse.error == null) {
                    this.notificationService.notify({
                        title: 'Reports created succesfully!!',
                        type: NotificationType.success,
                        message: 'Sample data created successfully.',
                    });
                } else {
                    this.notificationService.notify({
                        title: 'Oh Oh 😕',
                        type: NotificationType.danger,
                        message: postDailyReportResponse.error.message,
                    });
                }
            });
    }
}
