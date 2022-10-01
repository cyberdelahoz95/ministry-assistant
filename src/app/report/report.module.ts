import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReportRoutingModule } from './report-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { ReportFormComponent } from './components/report-form/report-form.component';
import { ReportListComponent } from './pages/report-list/report-list.component';
import { ReportService } from './services/report.service';
import { HttpClientModule } from '@angular/common/http';
import { ReportFormPageComponent } from './pages/report-form-page/report-form-page.component';

@NgModule({
    declarations: [
        ReportListComponent,
        ReportFormComponent,
        ReportFormPageComponent,
    ],
    imports: [
        CommonModule,
        ReportRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
    ],
    providers: [ReportService],
})
export class ReportModule {}
