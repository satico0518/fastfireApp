import { NgModule } from '@angular/core';
import { CheckInspectionsPage } from './check-inspections';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CheckInspectionsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckInspectionsPage
      }
    ])
  ],
})
export class CheckInspectionsPageModule {}
