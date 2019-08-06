import { NgModule } from '@angular/core';
import { CheckHistoricInspectionsPage } from './check-historic-inspections';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CheckHistoricInspectionsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckHistoricInspectionsPage
      }
    ])
  ]
})
export class CheckHistoricInspectionsPageModule {}
