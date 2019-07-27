import { NgModule } from '@angular/core';
import { CustomersPage } from './customers';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CustomersPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomersPage
      }
    ])
  ],
})
export class CustomersPageModule {}
