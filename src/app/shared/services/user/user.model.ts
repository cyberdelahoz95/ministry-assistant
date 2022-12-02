import { User as SupabaseUser, Session } from '@supabase/supabase-js';

export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterUserResponse {
    error: any; // ToDo could it be fixed?
    session: Session | null;
    user: SupabaseUser | null;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RequestError {
    message?: string;
}
