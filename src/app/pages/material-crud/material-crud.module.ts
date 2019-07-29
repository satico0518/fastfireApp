import { NgModule } from '@angular/core';
import { MaterialCrudPage } from './material-crud';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MaterialCrudPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MaterialCrudPage
      }
    ])
  ]
})
export class MaterialCrudPageModule {}
