import { NgModule } from '@angular/core';
import { LocationCrudPage } from './location-crud';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LocationCrudPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LocationCrudPage
      }
    ])
  ]
})
export class LocationCrudPageModule {}
