import { NgModule } from '@angular/core';
import { CustomerCrudPage } from './customer-crud';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CustomerCrudPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerCrudPage
      }
    ])
  ]
})
export class CustomerCrudPageModule {}
