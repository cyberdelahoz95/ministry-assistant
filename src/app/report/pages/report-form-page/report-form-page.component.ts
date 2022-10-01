import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { NotificationType } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { environment } from 'src/environments/environment';

const { home } = environment.pages;

import {
    DailyReport,
    DailyReportCreateRequest,
    DailyReportUpdateRequest,
} from '../../../models/report.model';
import { ReportService } from '../../services/report.service';

@Component({
    selector: 'app-report-form',
    templateUrl: './report-form-page.component.html',
    styleUrls: ['./report-form-page.component.scss'],
})
export class ReportFormPageComponent implements OnInit {
    dailyReportId: number = 0;
    currentDailyReport: DailyReport | null = null;
    isLoading: boolean = this.setLoading(false);

    constructor(
        private reportService: ReportService,
        private notificationService: NotificationService,
        private loaderService: LoaderService,
        private titleService: Title,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.titleService.setTitle('Service report form');
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            if (params.reportId && params.reportId != 0) {
                this.dailyReportId = params.reportId;
                this.loadReport();
            }
        });
    }

    handleSubmit(dailyReportDTO: DailyReport) {
        if (this.dailyReportId == 0) {
            this.postDailyReport(dailyReportDTO as DailyReportCreateRequest);
        } else {
            this.putDailyReport(dailyReportDTO as DailyReportUpdateRequest);
        }
    }

    deleteDailyReport() {
        if (
            this.dailyReportId != 0 &&
            confirm('Are you sure you want to delete this report?')
        ) {
            this.reportService
                .deleteDailyReport(this.dailyReportId.toString())
                .subscribe((deleteDailyReportRes) => {
                    if (!deleteDailyReportRes.error) {
                        this.notificationService.notify({
                            title: 'Report was deleted!!',
                            type: NotificationType.success,
                            message:
                                'your activity report was deleted succesfully.',
                        });
                        this.router.navigate([home]);
                    } else {
                        this.notificationService.notify({
                            title: 'Oh Oh 😕',
                            type: NotificationType.danger,
                            message: deleteDailyReportRes.error.message,
                        });
                    }
                });
        }
    }

    private setLoading(newState: boolean) {
        this.isLoading = newState;
        this.loaderService.adjustLoaderVisibility(this.isLoading);
        return newState;
    }

    private loadReport() {
        this.setLoading(true);
        this.reportService
            .getDailyReportById(this.dailyReportId)
            .subscribe((getDailyReportByIdRes) => {
                if (!getDailyReportByIdRes.error) {
                    this.currentDailyReport = getDailyReportByIdRes.data[0];
                } else {
                    this.notificationService.notify({
                        title: 'Oh Oh 😕',
                        type: NotificationType.danger,
                        message: getDailyReportByIdRes.error.message,
                    });
                }
            })
            .add(() => {
                this.setLoading(false);
            });
    }

    private postDailyReport(dailyReportDTO: DailyReportCreateRequest) {
        this.reportService
            .postDailyReport(dailyReportDTO)
            .subscribe((postDailyReportResponse) => {
                if (postDailyReportResponse.error == null) {
                    this.notificationService.notify({
                        title: 'Report created succesfully!!',
                        type: NotificationType.success,
                        message:
                            'Your service activity report was created successfully.',
                    });
                    this.router.navigate([home]);
                } else {
                    this.notificationService.notify({
                        title: 'Oh Oh 😕',
                        type: NotificationType.danger,
                        message: postDailyReportResponse.error.message,
                    });
                }
            });
    }

    private putDailyReport(dailyReportDTO: DailyReportUpdateRequest) {
        dailyReportDTO.id = this.dailyReportId.toString();
        this.reportService
            .putDailyReport(dailyReportDTO)
            .subscribe((putDailyReportResponse) => {
                if (putDailyReportResponse.error == null) {
                    this.notificationService.notify({
                        title: 'Report was updated!!',
                        type: NotificationType.success,
                        message:
                            'Your service activity report was updated successfully.',
                    });
                    this.router.navigate([home]);
                } else {
                    this.notificationService.notify({
                        title: 'Oh Oh 😕',
                        type: NotificationType.danger,
                        message: putDailyReportResponse.error.message,
                    });
                }
            });
    }
}
