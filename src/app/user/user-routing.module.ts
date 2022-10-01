import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { OnlyNonLoggedUsersRoutesGuard } from '../guards/only-non-logged-users-routes/only-non-logged-users-routes.guard';

const routes: Routes = [
    {
        path: 'register',
        canActivate: [OnlyNonLoggedUsersRoutesGuard],
        component: RegisterComponent,
    },
    {
        path: 'login',
        canActivate: [OnlyNonLoggedUsersRoutesGuard],
        component: LoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
