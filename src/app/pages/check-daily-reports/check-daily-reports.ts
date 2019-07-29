import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ReportDetailPage } from '../report-detail/report-detail';
import { NavController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-check-daily-reports',
  templateUrl: 'check-daily-reports.html',
})
export class CheckDailyReportsPage {

  reports: any[];

  constructor(
    public navCtrl: NavController,
    private admSrvc: AdminService,
    public us: UtilsService
    ) {

  }

  ionViewDidEnter() {
    this.us.presentLoading('cargando avances').then(loader => {
      this.admSrvc.getCreatedReports().subscribe(list => {
        this.reports = list;
        loader.dismiss();
      }, err => loader.dismiss());
    });
  }

  goToDetail(report) {
    this.navCtrl.navigateForward(['reportdetailpage'], { state: { report }} );
  }

}
