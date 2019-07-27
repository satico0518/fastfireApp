import { NgModule } from '@angular/core';
import { DatabasePage } from './database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DatabasePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DatabasePage
      }
    ])
  ],
})
export class DatabasePageModule {}
