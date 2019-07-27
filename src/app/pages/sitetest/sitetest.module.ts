import { NgModule } from '@angular/core';
import { SitetestPage } from './sitetest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SitetestPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SitetestPage
      }
    ])
  ],
})
export class SitetestPageModule {}
