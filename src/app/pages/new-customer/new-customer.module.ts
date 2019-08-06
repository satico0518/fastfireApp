import { NgModule } from '@angular/core';
import { NewCustomerPage } from './new-customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NewCustomerPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewCustomerPage
      }
    ])
  ]
})
export class NewCustomerPageModule {}
