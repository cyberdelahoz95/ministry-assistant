import { Injectable } from '@angular/core';
import {
    AuthResponse,
    createClient,
    Session,
    SupabaseClient,
    User as CurrentUserInfo,
    UserResponse,
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
    private session: Session | null = null;
    private userStatus = new ReplaySubject<CurrentUserInfo>();
    userStatus$ = this.userStatus.asObservable();

    constructor() {
        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey
        );
        //this.session = this.supabase.auth.getSession();
        this.supabase.auth.onAuthStateChange(async (event, session) => {
            this.session = session;
            const getCurrentUserResponse: UserResponse =
                await this.supabase.auth.getUser();
            this.userStatus.next(
                getCurrentUserResponse.data.user as CurrentUserInfo
            );
        });
    }

    async register(user: RegisterUserRequest): Promise<AuthResponse> {
        let registerRes: AuthResponse = {
            error: null,
            data: {
                user: null,
                session: null,
            },
        };
        try {
            registerRes = await this.supabase.auth.signUp({
                email: user.email,
                password: user.password,
                options: {
                    data: {
                        name: user.name,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
        return registerRes;
    }

    async authenticate(credentials: LoginRequest) {
        return await this.supabase.auth.signInWithPassword(credentials);
    }

    async getLoggedUserMetadata() {
        return (await this.supabase.auth.getUser())?.data.user?.user_metadata;
    }

    async getLoggedUserId() {
        return (await this.supabase.auth.getUser())?.data.user?.id;
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
