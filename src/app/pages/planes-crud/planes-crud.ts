import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AdminService } from '../../services/admin.service';
import { ICrud } from '../../interfaces/crud.interface';
import { LocationModel } from '../../models/location.model';
import { CustomerModel } from '../../models/customer.model';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NewPlanePage } from '../new-plane/new-plane';

@Component({
  selector: 'page-planes-crud',
  templateUrl: 'planes-crud.html',
  styleUrls: ['planes-crud.scss']
})
export class PlanesCrudPage implements ICrud {


  loc: LocationModel;
  cust: CustomerModel;
  planes: any[];

  constructor(
    public roter: Router, private actRoute: ActivatedRoute, private modal: ModalController,
    private admSrvc: AdminService, private alert: AlertController,
    private sanit: DomSanitizer, public us: UtilsService) {
      this.actRoute.queryParams.subscribe(() => {
        if (this.roter.getCurrentNavigation().extras.state) {
          const obj = this.roter.getCurrentNavigation().extras.state.obj;
          this.loc = obj.loc;
          this.cust = obj.cust;
          this.getObj();
        }
      });
  }

  getObj() {
    this.admSrvc.getPlanes(this.loc).subscribe(data => {
      this.planes = data;
    });
  }

  newObj() {
    this.modal.create({ component: NewPlanePage, componentProps: { obj: this.loc }})
      .then(modal => modal.present());
  }

  remove(pln) {
    this.alert.create({
      header: 'Confirmación',
      message: 'Realmente desea inactivar este plano?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Inactivar',
          handler: () => {
            this.admSrvc.removePlane(pln, this.loc.key).then(resp => {
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }

  edit(pln: any) {
    const obj = { pln, loc: this.loc };
    // this.modal.create({ component: EditPlanePage, componentProps: { obj }})
    //   .then(modal => modal.present());
  }

  safeUrl(url: string): SafeUrl {
    return this.sanit.bypassSecurityTrustUrl(url);
  }
}
