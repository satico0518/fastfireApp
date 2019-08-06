import { NgModule } from '@angular/core';
import { NewLocationPage } from './new-location';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NewLocationPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewLocationPage
      }
    ])
  ],
})
export class NewLocationPageModule {}
