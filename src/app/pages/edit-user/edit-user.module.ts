import { NgModule } from '@angular/core';
import { EditUserPage } from './edit-user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EditUserPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditUserPage
      }
    ])
  ],
})
export class EditUserPageModule {}
