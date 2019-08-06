import { NgModule } from '@angular/core';
import { EditPlanePage } from './edit-plane';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EditPlanePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditPlanePage
      }
    ])
  ]
})
export class EditPlanePageModule {}
