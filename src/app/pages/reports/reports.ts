import { Component } from '@angular/core';
import { ProcessEnum } from '../../enums/process.enum';
import { NavController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
  styleUrls: ['reports.scss']
})
export class ReportsPage {

  reports = [
    {
      name: 'Inspecciones por Locacion',
      desc: 'Histórico de las inspecciones realizadas en una locación específica',
      icon: 'md-qr-scanner',
      process: ProcessEnum.CheckHistInspLoc
    }, {
      name: 'Inspecciones por Operario',
      desc: 'Histórico de las inspecciones realizadas por un operario específico',
      icon: 'md-contact',
      process: ProcessEnum.CheckHistInspOper
    }, {
      name: 'Avances por Locacion',
      desc: 'Histórico de los avances realizadas una locación específica',
      icon: 'md-construct',
      process: ProcessEnum.CheckHistReportLoc
    }, {
      name: 'Avances por Operario',
      desc: 'Histórico de los avances realizados por un operario específico',
      icon: 'md-contact',
      process: ProcessEnum.CheckHistReportOper
    }
  ];

  constructor(public navCtrl: NavController, public us: UtilsService) {

  }

  goToReport(process: ProcessEnum) {
    switch (process) {
      case ProcessEnum.CheckHistInspLoc:
      case ProcessEnum.CheckHistReportLoc:
        this.navCtrl.navigateForward('/customerspage', { state: { process } });
        break;
      case ProcessEnum.CheckHistInspOper:
      case ProcessEnum.CheckHistReportOper:
        this.navCtrl.navigateForward('/operspage', { state: { process } });
        break;
      default:
        break;
    }
  }
}
