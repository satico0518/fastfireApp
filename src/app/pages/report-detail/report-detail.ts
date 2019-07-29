import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UtilsService } from '../../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'page-report-detail',
  templateUrl: 'report-detail.html',
})
export class ReportDetailPage {

  report: any = { memo: ''};
  loader: HTMLIonLoadingElement;
  toast: any;

  constructor(
    private actRoute: ActivatedRoute, private navCtrl: NavController,
    public router: Router, public alertCtrl: AlertController,
    public modalCtrl: ModalController, private admnSrvc: AdminService,
    public us: UtilsService) {
      this.actRoute.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.report = this.router.getCurrentNavigation().extras.state.report;
        }
      });
  }

  goToViewer(img) {
    this.us.goToViewer(img);
  }

  checkReport() {
    this.alertCtrl.create({
      header: 'Confirmación',
      message: 'Realmente desea chequear este avance?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Chequear',
          handler: () => {
            this.us.presentLoading('Chequeando avance...').then(loader => {
              this.admnSrvc.checkReport(this.report.creationDate).then(resp => {
              if (resp) {
                this.us.presentToast('Avance Chequeado exitosamente!', 'success').then(toast => {
                  this.toast = toast;
                  this.navCtrl.back();
                });
                this.loader.dismiss();
              }
              }).catch(err => {
                loader.dismiss();
                this.us.presentToast(JSON.stringify(err), 'danger').then(toast => toast.present());
              });
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }
}
