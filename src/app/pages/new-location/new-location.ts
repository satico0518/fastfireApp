import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ModalController, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-new-location',
  templateUrl: 'new-location.html',
})
export class NewLocationPage {

  name: string;
  address: string;
  state: boolean;
  constructor(
    public modal: ModalController, public alertCtrl: AlertController,
    private admSrvc: AdminService, public us: UtilsService) {

  }

  add() {
    this.us.presentLoading('creando locación...').then(loader => {
      this.admSrvc.newLocation({name: this.name, address: this.address, state: true}).then(resp => {
        console.log('new location resp modal', resp);
        if (resp) {
          this.name = '';
          this.address = '';
          this.us.presentToast('Locación Creada exitosamente!', 'success').then(toast => {
            loader.dismiss();
            toast.onDidDismiss().then(() => {
              this.modal.dismiss();
            });
          });
        }
      });
    });
  }

  closeModal() {
    this.modal.dismiss();
  }
}
