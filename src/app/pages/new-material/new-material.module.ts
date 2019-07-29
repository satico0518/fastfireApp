import { NgModule } from '@angular/core';
import { NewMaterialPage } from './new-material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NewMaterialPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewMaterialPage
      }
    ])
  ],
})
export class NewMaterialPageModule {}
