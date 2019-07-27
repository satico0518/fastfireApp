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
    path: 'reportdetailpage',
    loadChildren: '../app/pages/report-detail/report-detail.module#ReportDetailPageModule'
  },
  {
    path: 'checklocationreportspage',
    loadChildren: '../app/pages/check-location-reports/check-location-reports.module#CheckLocationReportsPageModule'
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
