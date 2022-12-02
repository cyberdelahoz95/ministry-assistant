import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
    MonthlyReport,
    MonthlyReportUpdateRequest,
} from 'src/app/models/report.model';
import { UserService } from 'src/app/shared/services/user/user.service';

import { environment } from '../../../environments/environment';
const { monthlyReports } = environment.tables;
const { generateMonthlyReport } = environment.dataFunctions;

@Injectable()
export class DashboardService {
    private supabase: SupabaseClient;
    //private currentUserId: string | undefined;

    constructor(private userService: UserService) {
        this.supabase = this.userService.getSupabaseClient();
        //this.currentUserId = this.userService.getLoggedUserId();
    }

    putMonthlyReport(reportUpdateRequest: MonthlyReportUpdateRequest) {
        const id = reportUpdateRequest.id;
        delete reportUpdateRequest.id;
        return from(
            this.supabase
                .from(monthlyReports)
                .update(reportUpdateRequest)
                .eq('id', id)
                .select()
        ).pipe(
            catchError((error) => {
                return throwError(error.error);
            })
        );
    }

    getLastMonthConsolidatedReport() {
        const date = new Date();
        const firstDayPrevMonth = new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            1
        );
        const lastDayPrevMonth = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        );

        return from(
            this.supabase
                .from(monthlyReports)
                .select()
                .gte('date', firstDayPrevMonth.toDateString())
                .lte('date', lastDayPrevMonth.toDateString())
        ).pipe(catchError((error) => throwError(error.error)));
    }

    generateMonthlyReport() {
        return from(this.supabase.rpc(generateMonthlyReport)).pipe(
            catchError((error) => throwError(error.error))
        );
    }
}
