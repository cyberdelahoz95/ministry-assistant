// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const supabaseUrl = 'http://localhost:54321';
export const environment = {
    production: false,
    supabaseUrl: supabaseUrl,
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs',
    url_api: supabaseUrl,
    tables: {
        dailyReports: 'daily-reports',
        monthlyReports: 'monthly-reports',
        transportationReports: 'transportation-services',
    },
    dataFunctions: {
        generateMonthlyReport: 'generate_previous_month_report',
    },
    pages: {
        login: '/user/login',
        reportList: '/report/list',
        home: '/',
    },
    devUsername: 'hdelahoz@gmail.com',
    devName: 'Henri de la Hoz',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
