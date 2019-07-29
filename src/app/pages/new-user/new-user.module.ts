import { NgModule } from '@angular/core';
import { NewUserPage } from './new-user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NewUserPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewUserPage
      }
    ])
  ],
})
export class NewUserPageModule {}
