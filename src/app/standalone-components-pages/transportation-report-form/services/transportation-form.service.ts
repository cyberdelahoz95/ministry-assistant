import { Injectable } from '@angular/core';
import { throwError, of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../../../environments/environment';

import {
    TransportationReportCreateRequest,
    TransportationReportSearchRequest,
    TransportationReportUpdateRequest,
} from '../../../models/transportation-report.model';

import { UserService } from 'src/app/shared/services/user/user.service';

const { transportationReports } = environment.tables;

@Injectable()
export class TransportationFormService {
    private supabase: SupabaseClient;

    constructor(private userService: UserService) {
        this.supabase = this.userService.getSupabaseClient();
    }

    putTransportationReport(
        reportUpdateRequest: TransportationReportUpdateRequest
    ) {
        const id = reportUpdateRequest.id;
        delete reportUpdateRequest.id;
        return from(
            this.supabase
                .from(transportationReports)
                .update(reportUpdateRequest)
                .match({ id })
        ).pipe(
            catchError((error) => {
                return throwError(error.error);
            })
        );
    }

    deleteTransportationReport(transportationReportId: string) {
        return from(
            this.supabase
                .from(transportationReports)
                .delete()
                .eq('id', transportationReportId)
        ).pipe(catchError((error) => throwError(error.error)));
    }

    async postTransportationReport(
        reportCreateRequest: TransportationReportCreateRequest
    ) {
        if (
            reportCreateRequest.date === undefined ||
            reportCreateRequest.date === ''
        ) {
            reportCreateRequest.date = new Date().toDateString();
        }
        reportCreateRequest.userId = await this.userService.getLoggedUserId();

        return await this.supabase
            .from(transportationReports)
            .insert([reportCreateRequest]);
    }

    getTransportationReportById(transportationReportId: number) {
        return from(
            this.supabase
                .from(transportationReports)
                .select()
                .match({ id: transportationReportId })
        ).pipe(catchError((error) => throwError(error.error)));
    }

    getAllReports(
        transportationReportsSearchRequest: TransportationReportSearchRequest
    ) {
        let getAllReportsQueryBuilder = this.supabase
            .from(transportationReports)
            .select();
        if (
            transportationReportsSearchRequest.fromDate &&
            transportationReportsSearchRequest.toDate
        ) {
            getAllReportsQueryBuilder.gte(
                'date',
                transportationReportsSearchRequest.fromDate
            );
            getAllReportsQueryBuilder.lte(
                'date',
                transportationReportsSearchRequest.toDate
            );
        }
        return from(getAllReportsQueryBuilder.match({})).pipe(
            catchError((error) => throwError(error.error))
        );
    }

    async postManyTransportationReports(
        reportCreateRequests: TransportationReportCreateRequest[]
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
            .from(transportationReports)
            .insert(reportCreateRequests);
    }
}
