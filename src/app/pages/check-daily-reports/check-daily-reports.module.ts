import { NgModule } from '@angular/core';
import { CheckDailyReportsPage } from './check-daily-reports';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CheckDailyReportsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckDailyReportsPage
      }
    ])
  ],
})
export class CheckDailyReportsPageModule {}
