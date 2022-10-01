import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportFormPageComponent } from './pages/report-form-page/report-form-page.component';

import { ReportListComponent } from './pages/report-list/report-list.component';

const routes: Routes = [
    {
        path: 'list',
        component: ReportListComponent,
    },
    {
        path: 'create',
        component: ReportFormPageComponent,
    },
    {
        path: 'edit/:reportId',
        component: ReportFormPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportRoutingModule {}
