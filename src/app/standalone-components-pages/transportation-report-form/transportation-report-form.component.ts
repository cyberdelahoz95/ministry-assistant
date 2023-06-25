import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import {
    TransportationReport,
    TransportationReportCreateRequest,
    TransportationReportUpdateRequest,
} from 'src/app/models/transportation-report.model';
import { TransportationFormService } from './services/transportation-form.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationType } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';

import { TransportationFormComponent } from './components/transportation-form/transportation-form.component';

const { home } = environment.pages;

@Component({
    selector: 'ma-transportation-report-form',
    standalone: true,
    imports: [CommonModule, MatCardModule, TransportationFormComponent],
    providers: [TransportationFormService],
    templateUrl: './transportation-report-form.component.html',
    styleUrls: ['./transportation-report-form.component.scss'],
})
export class TransportationReportFormComponent implements OnInit {
    transportationReportId: number = 0;
    currentTransportationReport: TransportationReport | null = null;
    isLoading: boolean = this.setLoading(false);

    constructor(
        private transportationFoormService: TransportationFormService,
        private notificationService: NotificationService,
        private loaderService: LoaderService,
        private titleService: Title,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.titleService.setTitle('Transportation report form');
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            if (params.reportId && params.reportId != 0) {
                this.transportationReportId = params.reportId;
                this.loadReport();
            }
        });
    }

    handleSubmit(transportationReportDTO: TransportationReport) {
        if (this.transportationReportId == 0) {
            this.postTransportationReport(
                transportationReportDTO as TransportationReportCreateRequest
            );
        } else {
            this.putTransportationReport(
                transportationReportDTO as TransportationReportUpdateRequest
            );
        }
    }

    deleteTransportationReport() {
        if (
            this.transportationReportId != 0 &&
            confirm('Are you sure you want to delete this report?')
        ) {
            this.transportationFoormService
                .deleteTransportationReport(
                    this.transportationReportId.toString()
                )
                .subscribe((deleteTransportationReportRes) => {
                    if (!deleteTransportationReportRes.error) {
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
                            message:
                                deleteTransportationReportRes.error.message,
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
        this.transportationFoormService
            .getTransportationReportById(this.transportationReportId)
            .subscribe((getTransportationReportByIdRes) => {
                if (!getTransportationReportByIdRes.error) {
                    this.currentTransportationReport =
                        getTransportationReportByIdRes.data[0];
                } else {
                    this.notificationService.notify({
                        title: 'Oh Oh 😕',
                        type: NotificationType.danger,
                        message: getTransportationReportByIdRes.error.message,
                    });
                }
            })
            .add(() => {
                this.setLoading(false);
            });
    }

    private postTransportationReport(
        transportationReportDTO: TransportationReportCreateRequest
    ) {
        this.transportationFoormService
            .postTransportationReport(transportationReportDTO)
            .then((postTransportationReportResponse) => {
                if (postTransportationReportResponse.error == null) {
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
                        message: postTransportationReportResponse.error.message,
                    });
                }
            });
    }

    private putTransportationReport(
        transportationReportDTO: TransportationReportUpdateRequest
    ) {
        transportationReportDTO.id = this.transportationReportId.toString();
        this.transportationFoormService
            .putTransportationReport(transportationReportDTO)
            .subscribe((putTransportationReportResponse) => {
                if (putTransportationReportResponse.error == null) {
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
                        message: putTransportationReportResponse.error.message,
                    });
                }
            });
    }
}
