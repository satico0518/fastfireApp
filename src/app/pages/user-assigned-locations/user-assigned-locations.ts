import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ProcessEnum } from '../../enums/process.enum';
import { UserModel } from '../../models/user.model';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-user-assigned-locations',
  templateUrl: 'user-assigned-locations.html',
  styleUrls: ['user-assigned-locations.scss']
})
export class UserAssignedLocationsPage {

  isCustomerCheck: boolean;
  isAssignLoc: boolean;
  locations: any;
  userSelected: UserModel;
  process: ProcessEnum;
  loadingElement: any;
  toast: any;

  constructor(
    private actRoute: ActivatedRoute, private router: Router, private alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private admSrvc: AdminService,
    private toastCtrl: ToastController, private us: UtilsService) {
    this.actRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userSelected = this.router.getCurrentNavigation().extras.state.user;
        this.process = this.router.getCurrentNavigation().extras.state.process;
      }
    });
  }

  ionViewWillEnter() {
    if (this.process === ProcessEnum.AssignLocsToUser) {
      this.isAssignLoc = true;
      this.isCustomerCheck = false;
    } else if (this.process === ProcessEnum.CustomerCheck) {
      this.isCustomerCheck = true; this.isAssignLoc = false;
    }
    this.us.presentLoading('Cargando locaciones asignadas...').then(loader => this.loadingElement = loader);
    if (!this.userSelected) {
      this.us.presentToast('usuario indefinido').then(toast => this.toast = toast);
      setTimeout(() => {
        this.router.navigate(['/']);
        this.loadingElement.dismiss();
      }, 2000);
      return;
    }
    this.admSrvc.getUserAssignedLocations(this.userSelected.id).then((list: any[]) => {
      this.locations = list;
      this.loadingElement.dismiss();
    }).catch(() =>  this.loadingElement.dismiss());
  }

  assignLoc() {
    this.router.navigate(['customerspage'], { state: { process: ProcessEnum.AssignLocsToUser }});
  }

  remove(loc) {
    this.presentAlert('Confirmación', 'Realmente desea desasignar esta locación: ' + loc.name + '?', loc);
  }

  checkLocationReports(loc) {
    this.router.navigate(['checklocationreportspage'], { state: { loc }});
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
        }, {
          text: 'Desasignar',
          cssClass: 'danger',
          handler: () => {
            this.us.presentLoading('Desasignando locación...').then(loader => this.loadingElement = loader);
            this.admSrvc.removeAssignedLoc(loc).then(resp => {
              if (resp) {
                this.us.presentToast('Locación Desasignada exitosamente!').then(toast => this.toast = toast);
                this.toast.onDidDismiss().then(() => {
                  this.router .navigate(['/']);
                });
              }
              this.loadingElement.dismiss();
            }).catch(err => {
              this.presentAlert('Error desasignando locacion, ', JSON.stringify(err));
              this.loadingElement.dismiss();
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
