import { Component } from '@angular/core';
import { ProcessEnum } from '../../enums/process.enum';
import { UtilsService } from '../../services/utils.service';
import { ProcessService } from '../../services/process.service';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  AlertController,
  ToastController
} from '@ionic/angular';

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {
  currentProcess: ProcessEnum;
  locations: any;
  title: string;
  nextPage: any;
  custId: string;
  toast: HTMLIonToastElement;

  constructor(
    public router: Router,
    private procSrvc: ProcessService,
    public loadingCtrl: LoadingController,
    private us: UtilsService,
    private admSrvc: AdminService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actRoute: ActivatedRoute
  ) {
    this.actRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.currentProcess = this.router.getCurrentNavigation().extras.state.process;
        this.title = this.us.getTitleByProcess(this.currentProcess);
        this.custId = this.router.getCurrentNavigation().extras.state.custId;

        switch (this.currentProcess) {
          case ProcessEnum.Inpection:
            this.nextPage = 'orderpage';
            break;
          case ProcessEnum.Planes:
            this.nextPage = 'planespage';
            break;
          case ProcessEnum.SiteTest:
            this.nextPage = 'sitetestpage';
            break;
          case ProcessEnum.DailyReport:
            this.nextPage = 'dailyreportpage';
            break;
          case ProcessEnum.DailyReport:
            this.nextPage = 'customerspage';
            break;
          case ProcessEnum.CheckHistInspLoc:
          case ProcessEnum.CheckHistInspOper:
            // this.nextPage = CheckHistoricInspectionsPage;
            break;
          case ProcessEnum.CheckHistReportLoc:
          case ProcessEnum.CheckHistReportOper:
            // this.nextPage = CheckHistoricDailyReportsPage;
            break;
          default:
            break;
        }
      }
    });
  }

  ionViewWillEnter() {
    this.us.presentLoading('Cargando locaciones...').then(loader => {
      if (
        this.currentProcess === ProcessEnum.CheckHistInspLoc ||
        this.currentProcess === ProcessEnum.CheckHistInspOper ||
        this.currentProcess === ProcessEnum.CheckHistReportLoc ||
        this.currentProcess === ProcessEnum.CheckHistReportOper ||
        this.currentProcess === ProcessEnum.AssignLocsToUser
      ) {
        this.procSrvc
          .getLocations(this.custId)
          .then(list => {
            this.locations = list;
            // console.log('this.locations', this.locations);
            loader.dismiss();
          })
          .catch(err => loader.dismiss());
      } else {
        this.procSrvc
          .getAssignedLocs(this.custId)
          .then(list => {
            this.locations = list;
            // console.log('this.locations', this.locations);
            loader.dismiss();
          })
          .catch(err => loader.dismiss());
      }
    });
  }

  goToNextPage(loc) {
    if (this.currentProcess === ProcessEnum.AssignLocsToUser) {
      this.presentAlert(
        'Confirmación',
        'Realmente desea autorizar la locación: ' + loc.data.name + '?',
        loc
      );
    } else {
      this.procSrvc.currentLoc = {
        id: loc.id,
        name: loc.data.name,
        address: loc.data.address
      };
      this.router.navigate([this.nextPage], { state: { loc } });
    }
  }

  async presentToast(msg: string) {
    this.toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    this.toast.present();
  }

  async presentAlert(header: string, msg: string, loc?: any) {
    const alert = await this.alertCtrl.create({
      header,
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Autorizar',
          cssClass: 'secondary',
          handler: () => {
            this.us.presentLoading('Asignando locación...').then(loader => {
              this.admSrvc
                .authorizeLocToUser(loc)
                .then(resp => {
                  if (resp) {
                    this.presentToast('Locación Asignada exitosamente!');
                    this.toast.onDidDismiss().then(() => {
                      this.router.navigate(['/']);
                    });
                  }
                  loader.dismiss();
                })
                .catch(err => {
                  this.presentAlert(
                    'Error asignando locacion, ',
                    JSON.stringify(err)
                  );
                  loader.dismiss();
                });
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
