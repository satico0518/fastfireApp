import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserModel } from '../../models/user.model';
import { ModalController, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html',
})
export class NewUserPage {
  errorMsg: string;
  logo = 'https://static.miweb.padigital.es/var/m_4/42/420/51019/711652-imagen-no-disponible.jpg';
  user = new UserModel();

  constructor(
    public modal: ModalController, public alertCtrl: AlertController,
    private admSrvc: AdminService, public us: UtilsService
    ) {}

  async add() {
    if (await this.validateForm()) {
      this.us.presentLoading('creando usuario...').then(loader => {
      this.admSrvc.newUser(this.user).then(resp => {
          if (resp) {
            this.ClearModel();
            this.us.presentToast('Usuario Creado exitosamente!', 'success').then(toast => {
              loader.dismiss();
              toast.onDidDismiss().then(() => {
                this.modal.dismiss();
              });
            });
          } else {
            loader.dismiss();
          }
        }, err => loader.dismiss());
      });
    }
  }

   validateForm(): Promise<boolean> {
    return new Promise(resolve => {
      if (!this.user.email) {
        this.showErrorModel('Correo es requerido!');
        resolve(false);
        return;
      }
      this.us.validateEmail(this.user.email).then(val => {
        if (!this.user.name) {
        this.showErrorModel('Nombre es requerido!');
        resolve(false);
        return;
        } else if (!this.user.lastname) {
          this.showErrorModel('Apellido es requerido!');
          resolve(false);
          return;
        } else if (!this.user.identType) {
          this.showErrorModel('Tipo Identificacion es requerido!');
          resolve(false);
          return;
        } else if (!this.user.ident) {
          this.showErrorModel('Numero de Identificacion es requerido!');
          resolve(false);
          return;
        } else if (!val) {
          this.showErrorModel('Correo no válido, el correo debe tener un formato parecido a este: "correo@dominio.com"!');
          resolve(false);
          return;
        } else if (!this.user.profile) {
          this.showErrorModel('Perfil es requerido!');
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  closeModal() {
    this.modal.dismiss();
  }

  ClearModel() {
    this.user.address = '';
    this.user.email = '';
    this.user.id = '';
    this.user.lastname = '';
    this.user.name = '';
    this.user.pass = '';
    this.user.phone = '';
    this.user.profile = null;
  }

  showErrorModel(msg: string) {
    this.us.presentToast(msg, 'danger').then(toast => toast.present());
  }
}
