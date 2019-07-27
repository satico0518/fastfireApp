import { NgModule } from '@angular/core';
import { LocationsPage } from './locations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LocationsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LocationsPage
      }
    ])
  ],
})
export class LocationsPageModule {}
