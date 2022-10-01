export interface DailyReport {
    id?: string;
    date?: string;
    serviceTime: number;
    otherServiceTime: number;
    publications: number;
    videos: number;
    returnVisits: number;
    notes: string;
}

export interface DailyReportCreateRequest extends Omit<DailyReport, 'id'> {
    userId?: string;
}

export interface DailyReportUpdateRequest
    extends Partial<DailyReportCreateRequest> {
    id?: string;
    updated_at?: string;
}

export interface DailyReportSearchRequest {
    fromDate?: string;
    toDate?: string;
}

export interface MonthlyReport {
    id?: string;
    date?: string;
    serviceTime: number;
    otherServiceTime: number;
    publications: number;
    videos: number;
    returnVisits: number;
    bibleStudies: number;
    notes: string;
}

export interface MonthlyReportUpdateRequest {
    id?: string;
    bibleStudies: number;
    notes: string;
}
