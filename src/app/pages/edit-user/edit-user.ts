import { Component } from '@angular/core';
import { AlertController, NavParams } from '@ionic/angular';
import { AdminService } from '../../services/admin.service';
import { UserModel } from '../../models/user.model';
import { ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

  user = new UserModel();
  constructor(
    public modal: ModalController, public alertCtrl: AlertController,
    private admSrvc: AdminService, private navParams: NavParams,
    public us: UtilsService) {
    this.user = this.navParams.get('obj');
  }

  edit() {
    this.us.presentLoading('editando usuario...').then(loader => {
      this.admSrvc.editUser(this.user).then(resp => {
        console.log('edit resp modal', resp);
        if (resp) {
          loader.dismiss();
          this.us.presentToast('Usuario Editado exitosamente!', 'success').then(toast => {
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
