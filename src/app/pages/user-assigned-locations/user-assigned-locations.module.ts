import { NgModule } from '@angular/core';
import { UserAssignedLocationsPage } from './user-assigned-locations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserAssignedLocationsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserAssignedLocationsPage
      }
    ])
  ]
})
export class UserAssignedLocationsPageModule {}
