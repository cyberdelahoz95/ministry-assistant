import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User as SupabaseUser } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';

import { UserService } from '../../services/user/user.service';
import { environment } from 'src/environments/environment';
import { User } from '../../services/user/user.model';

const { login } = environment.pages;

@Component({
    selector: 'ma-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    loggedUser: User | null;
    userInfoSubscription: Subscription = new Subscription();

    constructor(private router: Router, private userService: UserService) {
        this.loggedUser = this.userService.getLoggedUserMetadata() as User;
    }

    ngOnInit(): void {
        this.userInfoSubscription = this.userService.userStatus$.subscribe(
            (newUserInfo) => {
                this.loggedUser = newUserInfo
                    ? (newUserInfo.user_metadata as User)
                    : null;
            }
        );
    }

    ngOnDestroy(): void {
        this.userInfoSubscription.unsubscribe();
    }

    logOut(): void {
        this.userService.signOut();
        this.router.navigate([login]);
    }
}
