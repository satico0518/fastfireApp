import { NgModule } from '@angular/core';
import { NewPlanePage } from './new-plane';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NewPlanePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewPlanePage
      }
    ])
  ]
})
export class NewPlanePageModule {}
