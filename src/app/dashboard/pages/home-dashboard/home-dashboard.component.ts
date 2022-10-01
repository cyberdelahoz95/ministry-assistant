import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostgrestResponse } from '@supabase/supabase-js';
import { forkJoin } from 'rxjs';
import { NotificationType } from 'src/app/models/notification.model';
import {
    MonthlyReport,
    MonthlyReportUpdateRequest,
} from 'src/app/models/report.model';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-home-dashboard',
    templateUrl: './home-dashboard.component.html',
    styleUrls: ['./home-dashboard.component.scss'],
})
export class HomeDashboardComponent implements OnInit {
    private lastMonthReport: MonthlyReport | null = null;

    isLoading: boolean = this.setLoading(true);

    constructor(
        private dashboardService: DashboardService,
        private titleService: Title,
        private notificationService: NotificationService,
        private loaderService: LoaderService
    ) {
        this.titleService.setTitle('Dashboard');
    }

    ngOnInit(): void {
        forkJoin({
            getLastMonthReportRes: this.getLastMonthReport(),
        }).subscribe((forkJoinRes) => {
            this.handleGetLastMonthReportRes(forkJoinRes.getLastMonthReportRes);
            this.setLoading(false);
        });
    }

    get lastMonthReportProp() {
        return this.lastMonthReport;
    }

    generateMonthlyReport() {
        this.setLoading(true);
        this.dashboardService.generateMonthlyReport().subscribe((res) => {
            this.getLastMonthReport().subscribe((res) => {
                this.handleGetLastMonthReportRes(res);
                this.setLoading(false);
            });
        });
    }

    updateMonthlyReport(monthlyReportUR: MonthlyReportUpdateRequest) {
        this.setLoading(true);
        this.dashboardService
            .putMonthlyReport(monthlyReportUR)
            .subscribe((putMpnthlyReportResponse) => {
                if (putMpnthlyReportResponse.error == null) {
                    this.handleGetLastMonthReportRes(putMpnthlyReportResponse);
                    this.notificationService.notify({
                        title: 'Monthly report updated succesfully!!',
                        type: NotificationType.success,
                        message: 'Your monthly report was upted successfully.',
                    });
                } else {
                    this.notificationService.notify({
                        title: 'Oh Oh 😕',
                        type: NotificationType.danger,
                        message: putMpnthlyReportResponse.error.message,
                    });
                }
                this.setLoading(false);
            });
    }

    getLastMonthReport() {
        return this.dashboardService.getLastMonthConsolidatedReport();
    }
    handleGetLastMonthReportRes(res: PostgrestResponse<MonthlyReport>) {
        if (!res.error) {
            this.lastMonthReport = res.data ? res.data[0] : null;
        }
    }

    private setLoading(newState: boolean) {
        this.isLoading = newState;
        this.loaderService.adjustLoaderVisibility(this.isLoading);
        return newState;
    }
}
