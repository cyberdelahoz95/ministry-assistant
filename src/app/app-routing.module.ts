import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedRoutesGuard } from './guards/protected-routes/protected-routes.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
    {
        path: 'user',
        loadChildren: () =>
            import('./user/user.module').then((m) => m.UserModule),
    },
    {
        path: 'report',
        canActivate: [ProtectedRoutesGuard],
        component: LayoutComponent,
        loadChildren: () =>
            import('./report/report.module').then((m) => m.ReportModule),
    },
    {
        path: 'trf',
        pathMatch: 'full',
        canActivate: [ProtectedRoutesGuard],
        component: LayoutComponent,
        // instead of using loadChildren attribute function, we use childre attribute array.
        // we are doing it this way because loadChildren imports modules.
        // in this case we are using stand alone angular components and they do not need of modules to exist.
        // so now what we do is via children object loading such stand alone component.
        children: [
            {
                path: '',
                loadComponent: () =>
                    import(
                        './standalone-components-pages/transportation-report-form/transportation-report-form.component'
                    ).then((c) => c.TransportationReportFormComponent),
            },
        ],
    },
    {
        path: 'dashboard',
        canActivate: [ProtectedRoutesGuard],
        component: LayoutComponent,
        loadChildren: () =>
            import('./dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            ),
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
