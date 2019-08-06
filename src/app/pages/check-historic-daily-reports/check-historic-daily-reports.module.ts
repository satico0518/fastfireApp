import { NgModule } from '@angular/core';
import { CheckHistoricDailyReportsPage } from './check-historic-daily-reports';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CheckHistoricDailyReportsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckHistoricDailyReportsPage
      }
    ])
  ]
})
export class CheckHistoricDailyReportsPageModule {}
