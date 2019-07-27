import { NgModule } from '@angular/core';
import { ReportDetailPage } from './report-detail';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReportDetailPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportDetailPage
      }
    ])
  ]
})
export class ReportDetailPageModule {}
