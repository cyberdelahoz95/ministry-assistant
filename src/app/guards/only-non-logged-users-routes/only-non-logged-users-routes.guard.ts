import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OnlyNonLoggedUsersRoutesGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const userStatus = this.userService.isValidSession();
        if (!userStatus) {
            return true;
        } else {
            return this.router.parseUrl(environment.pages.home);
        }
    }
}
