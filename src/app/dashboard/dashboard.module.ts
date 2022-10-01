import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { LastMonthReportCardComponent } from './components/last-month-report-card/last-month-report-card.component';
import { GenerateSampleDataComponent } from './components/generate-sample-data/generate-sample-data.component';
import { ReportService } from '../report/services/report.service';

@NgModule({
    declarations: [
        HomeDashboardComponent,
        LastMonthReportCardComponent,
        GenerateSampleDataComponent,
    ],
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatInputModule,
        CommonModule,
        DashboardRoutingModule,
    ],
    providers: [DashboardService, ReportService],
})
export class DashboardModule {}
