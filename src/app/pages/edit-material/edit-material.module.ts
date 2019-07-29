import { NgModule } from '@angular/core';
import { EditMaterialPage } from './edit-material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EditMaterialPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditMaterialPage
      }
    ])
  ],
})
export class EditMaterialPageModule {}
