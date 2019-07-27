import { NgModule } from '@angular/core';
import { OrderDetailPage } from './order-detail';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OrderDetailPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderDetailPage
      }
    ])
  ],
})
export class OrderDetailPageModule {}
