import { NgModule } from '@angular/core';
import { EditCustomerPage } from './edit-customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EditCustomerPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditCustomerPage
      }
    ])
  ]
})
export class EditCustomerPageModule {}
