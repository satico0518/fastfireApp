import { NgModule } from '@angular/core';
import { PlanesCrudPage } from './planes-crud';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PlanesCrudPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlanesCrudPage
      }
    ])
  ]
})
export class PlanesCrudPageModule {}
