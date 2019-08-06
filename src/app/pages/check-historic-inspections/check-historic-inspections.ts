import { Component, OnInit } from '@angular/core';
import { OrderDetailPage } from '../order-detail/order-detail';
import { AdminService } from '../../services/admin.service';
import { ProcessEnum } from '../../enums/process.enum';
import { LocationModel } from '../../models/location.model';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-check-historic-inspections',
  templateUrl: 'check-historic-inspections.html',
})
export class CheckHistoricInspectionsPage implements OnInit{

  inspections: any[];
  process: ProcessEnum;
  loc: LocationModel;
  oper: any;
  histType: string;
  params: any;
  constructor(
    public navCtrl: NavController, public router: Router, private actRoute: ActivatedRoute,
    private admSrvc: AdminService, private alert: AlertController,
    public us: UtilsService) {
      this.actRoute.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.params = this.router.getCurrentNavigation().extras.state;
          if (this.params.hasOwnProperty('loc')) {
            this.loc = this.params.loc;
            if (this.loc) {
              this.histType = 'Históricos por Locación';
            }
          } else if (this.params.hasOwnProperty('oper')) {
            this.oper = this.params.oper;
            if (this.oper) {
              this.histType = `Operario: ${this.oper.name} ${this.oper.lastname}` ;
            }
          }
        }
      });
  }

  ngOnInit() {
    this.us.presentLoading('cargando inspecciones ...').then(loader => {
      if (this.params.hasOwnProperty('loc')) {
        this.admSrvc.getHistoricInspectionsByLoc(this.loc.id).subscribe(list => {
          this.inspections = list;
          if (list.length === 0) {
            this.alert.create({
              message: 'No se encontraron inspecciones para esta locación!'
            }).then(alert => alert.present());
          }
          loader.dismiss();
        });
      } else if (this.params.hasOwnProperty('oper')) {
        this.admSrvc.getHistoricInspectionsByOper(this.oper.email).subscribe(list => {
          this.inspections = list;
          if (list.length === 0) {
            this.alert.create({
              message: 'No se encontraron inspecciones para este operario!'
            }).then(alert => alert.present());
          }
          loader.dismiss();
        });
      }
    });
  }

  goToDetail(insp) {
    this.navCtrl.navigateForward('/orderdetailpage', { state: { insp } });
  }

}
