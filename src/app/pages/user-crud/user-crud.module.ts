import { NgModule } from '@angular/core';
import { UserCrudPage } from './user-crud';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserCrudPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserCrudPage
      }
    ])
  ],
})
export class UserCrudPageModule {}
