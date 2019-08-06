import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { LocationModel } from '../../models/location.model';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-edit-location',
  templateUrl: 'edit-location.html',
})
export class EditLocationPage {

  location = {} as LocationModel;
  initialName: string;
  constructor(
    public modal: ModalController, public alertCtrl: AlertController,
    private admSrvc: AdminService, public us: UtilsService,
    private navParams: NavParams) {
      this.location = this.navParams.get('obj');
      this.initialName = this.location.name;
  }

  edit() {
    this.us.presentLoading('editando locación...').then(loader => {
      this.admSrvc.editLocation(this.location, this.initialName).then(resp => {
        console.log('edit loc resp modal', resp);
        if (resp) {
          this.us.presentToast('Material Editado exitosamente!', 'success').then(toast => {
            loader.dismiss();
            toast.onDidDismiss().then(() => {
              this.modal.dismiss();
            });
          });
        } else {
          loader.dismiss();
        }
      },
        (err) => {
          console.error('Error editando locacion....', err);
          loader.dismiss();
        });
    });
  }

  closeModal() {
    this.modal.dismiss();
  }
}
