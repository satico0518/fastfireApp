import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ReportDetailPage } from '../report-detail/report-detail';
import { ProcessEnum } from '../../enums/process.enum';
import { LocationModel } from '../../models/location.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-check-historic-daily-reports',
  templateUrl: 'check-historic-daily-reports.html',
})
export class CheckHistoricDailyReportsPage implements OnInit {

  reports: any[];
  process: ProcessEnum;
  loc: LocationModel;
  oper: any;
  histType: string;
  params: any;

  constructor(
    public navCtrl: NavController, public router: Router,
    private admSrvc: AdminService, private alert: AlertController,
    private actRoute: ActivatedRoute, public us: UtilsService) {
      this.actRoute.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.params = this.router.getCurrentNavigation().extras.state;
          if (this.params.hasOwnProperty('loc')) {
            this.loc = this.params.loc;
            if (this.loc) {
              this.histType = 'Histórico por Locación';
            }
          } else if (this.params.hasOwnProperty('oper')) {
            this.oper = this.params.oper;
            if (this.oper) {
              this.histType = `Operario: ${this.oper.name} ${this.oper.lastname}`;
            }
          }
        }
      });
  }

  ngOnInit() {
    this.us.presentLoading('cargando avances ...').then(loader => {
      if (this.params.hasOwnProperty('loc')) {
        this.admSrvc.getHistoricDailyReportsByLoc(this.loc.id).subscribe(list => {
          this.reports = list;
          if (list.length === 0) {
            this.alert.create({
              message: 'No se encontraron avances para esta locación!'
            }).then(alert => alert.present());
          }
          loader.dismiss();
        }, err => loader.dismiss());
      } else if (this.params.hasOwnProperty('oper')) {
        this.admSrvc.getHistoricDailyReportsByOper(this.oper.email).subscribe(list => {
          this.reports = list;
          if (list.length === 0) {
            this.alert.create({
              message: 'No se encontraron avances para este operario!'
            }).then(alert => alert.present());
          }
          loader.dismiss();
        }, err => loader.dismiss());
      }
    });
  }

  goToDetail(report) {
    this.navCtrl.navigateForward('/reportdetailpage', { state: { report } });
  }

}
