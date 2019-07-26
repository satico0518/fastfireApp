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
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}