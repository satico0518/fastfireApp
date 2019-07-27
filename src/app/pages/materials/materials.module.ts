import { NgModule } from '@angular/core';
import { MaterialsPage } from './materials';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MaterialsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MaterialsPage
      }
    ])
  ],
})
export class MaterialsPageModule {}
