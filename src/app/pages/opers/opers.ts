import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ProcessEnum } from '../../enums/process.enum';
import { NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-opers',
  templateUrl: 'opers.html',
})
export class OpersPage implements OnInit {
  opers: any[];
  currentProcess: ProcessEnum;

  constructor(
    public navCtrl: NavController, public router: Router,
    private admSrvc: AdminService, public modalCtrl: ModalController,
    private acttRoute: ActivatedRoute, public us: UtilsService) {
      this.acttRoute.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.currentProcess = this.router.getCurrentNavigation().extras.state.process;
        }
      });
  }

  ngOnInit() {
    this.us.presentLoading('cargando operarios...').then(loader => {
      this.getObj().then(() => loader.dismiss());
    });
  }

  getObj(): Promise<void> {
    return new Promise(resolve => {
      this.admSrvc.getOpers().subscribe(list => {
        this.opers = list;
        resolve();
      });
    });
  }

  goToHistoric(oper) {
    if (this.currentProcess === ProcessEnum.CheckHistInspOper) {
      this.navCtrl.navigateForward('checkhistoricinspectionspage', { state: { oper }});
    } else if (this.currentProcess === ProcessEnum.CheckHistReportOper) {
      this.navCtrl.navigateForward('checkhistoricdailyreportspage', { state: { oper }});
    }
  }
}
