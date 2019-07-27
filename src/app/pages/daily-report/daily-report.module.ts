import { NgModule } from '@angular/core';
import { DailyReportPage } from './daily-report';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DailyReportPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DailyReportPage
      }
    ])
  ],
})
export class DailyReportPageModule {}
