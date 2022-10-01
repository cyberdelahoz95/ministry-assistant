import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';

import {
    DailyReport,
    DailyReportSearchRequest,
} from '../../../models/report.model';
import { ReportService } from '../../services/report.service';

import { NotificationType } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'ma-report-list',
    templateUrl: './report-list.component.html',
    styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) reportsPaginator: MatPaginator | null = null;
    displayedColumns: string[] = [
        'date',
        'serviceTime',
        'publications',
        'videos',
        'returnVisits',
        'otherServiceTime',
        'id',
    ];
    reports: DailyReport[] = [];
    reportsDataSource = new MatTableDataSource<DailyReport>();
    isLoading: boolean = this.setLoading(true);

    constructor(
        private titleService: Title,
        private reportService: ReportService,
        private notificationService: NotificationService,
        private loaderService: LoaderService
    ) {
        this.titleService.setTitle('Current month activity');
    }

    ngAfterViewInit() {
        this.reportsDataSource.paginator = this.reportsPaginator;
    }

    ngOnInit(): void {
        const now = new Date();
        const dailyReportSearchRequest: DailyReportSearchRequest = {
            fromDate: new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            ).toDateString(),
            toDate: new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0
            ).toDateString(),
        };
        this.reportService
            .getAllReports(dailyReportSearchRequest)
            .subscribe((allReportsRes) => {
                if (!allReportsRes.error) {
                    this.reports = allReportsRes.data;
                    this.reportsDataSource.data = this.reports;
                } else {
                    this.notificationService.notify({
                        title: 'Oh Oh 😕',
                        type: NotificationType.danger,
                        message: allReportsRes.error.message,
                    });
                }
            })
            .add(() => {
                this.setLoading(false);
            });
    }

    private setLoading(newState: boolean) {
        this.isLoading = newState;
        this.loaderService.adjustLoaderVisibility(this.isLoading);
        return newState;
    }
}
