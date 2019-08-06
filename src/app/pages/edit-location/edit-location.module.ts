import { NgModule } from '@angular/core';
import { EditLocationPage } from './edit-location';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EditLocationPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditLocationPage
      }
    ])
  ],
})
export class EditLocationPageModule {}
