import { NgModule } from '@angular/core';
import { FormatsPage } from './formats';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FormatsPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormatsPage
      }
    ])
  ],
})
export class FormatsPageModule {}
