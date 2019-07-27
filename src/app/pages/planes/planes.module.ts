import { NgModule } from '@angular/core';
import { PlanesPage } from './planes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PlanesPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlanesPage
      }
    ])
  ],
})
export class PlanesPageModule {}
