import { NgModule } from '@angular/core';
import { ReviewOrderPage } from './review-order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ReviewOrderPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReviewOrderPage
      }
    ])
  ],
})
export class ReviewOrderPageModule {}
