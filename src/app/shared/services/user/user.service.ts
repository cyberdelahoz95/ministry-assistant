import { Injectable } from '@angular/core';
import {
    createClient,
    Session,
    SupabaseClient,
    User as CurrentUserInfo,
} from '@supabase/supabase-js';
import { from, ReplaySubject } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
    LoginRequest,
    RegisterUserRequest,
    RegisterUserResponse,
} from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private supabase: SupabaseClient;
    private session: Session | null;
    private userStatus = new ReplaySubject<CurrentUserInfo>();
    userStatus$ = this.userStatus.asObservable();

    constructor() {
        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey,
            {
                multiTab: false,
            }
        );
        this.session = this.supabase.auth.session();
        this.supabase.auth.onAuthStateChange((event, session) => {
            this.session = session;
            this.userStatus.next(this.supabase.auth.user() as CurrentUserInfo);
        });
    }

    async register(user: RegisterUserRequest): Promise<RegisterUserResponse> {
        let registerRes: RegisterUserResponse = {
            error: null,
            user: null,
            session: null,
        };
        try {
            registerRes = await this.supabase.auth.signUp(
                {
                    email: user.email,
                    password: user.password,
                },
                {
                    data: {
                        name: user.name,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
        return registerRes;
    }

    async authenticate(credentials: LoginRequest) {
        return await this.supabase.auth.signIn(credentials);
    }

    getLoggedUserMetadata() {
        return this.supabase.auth.user()?.user_metadata;
    }

    getLoggedUserId() {
        return this.supabase.auth.user()?.id;
    }

    isValidSession() {
        return this.session != null;
    }

    signOut() {
        return this.supabase.auth.signOut();
    }

    getSupabaseClient() {
        return this.supabase;
    }
}
