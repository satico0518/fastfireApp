import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    loadChildren: '../app/pages/home/home.module#HomePageModule'
  },
  {
    path: 'loginpage',
    loadChildren: '../app/pages/login/login.module#LoginPageModule'
  },
  {
    path: 'formatspage',
    loadChildren: '../app/pages/formats/formats.module#FormatsPageModule'
  },
  {
    path: 'nsrpage',
    loadChildren: '../app/pages/nsr/nsr.module#NsrPageModule'
  },
  {
    path: 'locationspage',
    loadChildren: '../app/pages/locations/locations.module#LocationsPageModule'
  },
  {
    path: 'userassignedlocationspage',
    loadChildren: '../app/pages/user-assigned-locations/user-assigned-locations.module#UserAssignedLocationsPageModule'
  },
  {
    path: 'customerspage',
    loadChildren: '../app/pages/customers/customers.module#CustomersPageModule'
  },
  {
    path: 'orderpage',
    loadChildren: '../app/pages/order/order.module#OrderPageModule'
  },
  {
    path: 'databasepage',
    loadChildren: '../app/pages/databasepage/database.module#DatabasePageModule'
  },
  {
    path: 'sitetestpage',
    loadChildren: '../app/pages/sitetest/sitetest.module#SitetestPageModule'
  },
  {
    path: 'reportdetailpage',
    loadChildren: '../app/pages/report-detail/report-detail.module#ReportDetailPageModule'
  },
  {
    path: 'dailyreportpage',
    loadChildren: '../app/pages/daily-report/daily-report.module#DailyReportPageModule'
  },
  {
    path: 'checklocationreportspage',
    loadChildren: '../app/pages/check-location-reports/check-location-reports.module#CheckLocationReportsPageModule'
  },
  {
    path: 'checkinpectionspage',
    loadChildren: '../app/pages/check-inspections/check-inspections.module#CheckInspectionsPageModule'
  },
  {
    path: 'usercrudpage',
    loadChildren: '../app/pages/user-crud/user-crud.module#UserCrudPageModule'
  },
  {
    path: 'customercrudpage',
    loadChildren: '../app/pages/customer-crud/customer-crud.module#CustomerCrudPageModule'
  },
  {
    path: 'materialcrudpage',
    loadChildren: '../app/pages/material-crud/material-crud.module#MaterialCrudPageModule'
  },
  {
    path: 'locationcrudpage',
    loadChildren: '../app/pages/location-crud/location-crud.module#LocationCrudPageModule'
  },
  {
    path: 'planescrudpage',
    loadChildren: '../app/pages/planes-crud/planes-crud.module#PlanesCrudPageModule'
  },
  {
    path: 'checkdailyreports',
    loadChildren: '../app/pages/check-daily-reports/check-daily-reports.module#CheckDailyReportsPageModule'
  },
  {
    path: 'orderdetailpage',
    loadChildren: '../app/pages/order-detail/order-detail.module#OrderDetailPageModule'
  },
  {
    path: 'planespage',
    loadChildren: '../app/pages/planes/planes.module#PlanesPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
