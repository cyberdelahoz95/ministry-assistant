import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedRoutesGuard } from './guards/protected-routes/protected-routes.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
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
        path: 'dashboard',
        canActivate: [ProtectedRoutesGuard],
        component: LayoutComponent,
        loadChildren: () =>
            import('./dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
