export const environment = {
    production: true,
    supabaseUrl: 'https://anhuylnsctwixqpllzbn.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuaHV5bG5zY3R3aXhxcGxsemJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ2NTI0OTQsImV4cCI6MTk4MDIyODQ5NH0.eDHnXc6uYdYqV6uoQyfN-7H6aTM9cd_7ah_wYqhM65c',
    url_api: 'https://anhuylnsctwixqpllzbn.supabase.co',
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
};
