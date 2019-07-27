import { NgModule } from '@angular/core';
import { CheckLocationReportsPage } from './check-location-reports';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CheckLocationReportsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckLocationReportsPage
      }
    ])
  ],
})
export class CheckLocationReportsPageModule {}
