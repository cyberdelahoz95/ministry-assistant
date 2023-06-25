export interface TransportationReport {
    id?: string;
    date?: string;
    description: string;
    cost: number;
}

export interface TransportationReportCreateRequest
    extends Omit<TransportationReport, 'id'> {
    userId?: string;
}

export interface TransportationReportUpdateRequest
    extends Partial<TransportationReportCreateRequest> {
    id?: string;
    updated_at?: string;
}

export interface TransportationReportSearchRequest {
    fromDate?: string;
    toDate?: string;
}
