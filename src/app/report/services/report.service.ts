import { Injectable } from '@angular/core';
import { throwError, of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';
import {
    DailyReportCreateRequest,
    DailyReportUpdateRequest,
    DailyReportSearchRequest,
} from '../../models/report.model';
import { UserService } from 'src/app/shared/services/user/user.service';

const { dailyReports } = environment.tables;

@Injectable()
export class ReportService {
    private supabase: SupabaseClient;

    constructor(private userService: UserService) {
        this.supabase = this.userService.getSupabaseClient();
    }

    getAllReports(dailyReportsSearchRequest: DailyReportSearchRequest) {
        let getAllReportsQueryBuilder = this.supabase
            .from(dailyReports)
            .select();
        if (
            dailyReportsSearchRequest.fromDate &&
            dailyReportsSearchRequest.toDate
        ) {
            getAllReportsQueryBuilder.gte(
                'date',
                dailyReportsSearchRequest.fromDate
            );
            getAllReportsQueryBuilder.lte(
                'date',
                dailyReportsSearchRequest.toDate
            );
        }
        return from(getAllReportsQueryBuilder.match({})).pipe(
            catchError((error) => throwError(error.error))
        );
    }

    getDailyReportById(dailyReportId: number) {
        return from(
            this.supabase
                .from(dailyReports)
                .select()
                .match({ id: dailyReportId })
        ).pipe(catchError((error) => throwError(error.error)));
    }

    async postDailyReport(reportCreateRequest: DailyReportCreateRequest) {
        if (
            reportCreateRequest.date === undefined ||
            reportCreateRequest.date === ''
        ) {
            reportCreateRequest.date = new Date().toDateString();
        }
        reportCreateRequest.userId = await this.userService.getLoggedUserId();

        return await this.supabase
            .from(dailyReports)
            .insert([reportCreateRequest]);
    }

    async postManyDailyReports(
        reportCreateRequests: DailyReportCreateRequest[]
    ) {
        const userId = await this.userService.getLoggedUserId();

        reportCreateRequests.forEach((reportCreateRequest) => {
            if (
                reportCreateRequest.date === undefined ||
                reportCreateRequest.date === ''
            ) {
                reportCreateRequest.date = new Date().toDateString();
            }
            reportCreateRequest.userId = userId;
        });
        return await this.supabase
            .from(dailyReports)
            .insert(reportCreateRequests);
    }

    putDailyReport(reportUpdateRequest: DailyReportUpdateRequest) {
        const id = reportUpdateRequest.id;
        delete reportUpdateRequest.id;
        return from(
            this.supabase
                .from(dailyReports)
                .update(reportUpdateRequest)
                .match({ id })
        ).pipe(
            catchError((error) => {
                return throwError(error.error);
            })
        );
    }

    deleteDailyReport(dailyReportId: string) {
        return from(
            this.supabase.from(dailyReports).delete().eq('id', dailyReportId)
        ).pipe(catchError((error) => throwError(error.error)));
    }
}
