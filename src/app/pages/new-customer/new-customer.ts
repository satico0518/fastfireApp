import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CustomerModel } from '../../models/customer.model';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { ModalController, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-new-customer',
  templateUrl: 'new-customer.html',
})
export class NewCustomerPage {

  errorMsg: string;
  logo = this.us.notAvailableImage;
  cust = new CustomerModel();

  constructor(
    public modal: ModalController, public alertCtrl: AlertController,
    private admSrvc: AdminService, public us: UtilsService,
    private camera: Camera) {

  }

  add() {
    this.validateForm().then(valid => {
      if (valid) {
        this.us.presentLoading('creando cliente...').then(loader => {
          this.cust.icon = this.logo;
          this.admSrvc.newCustomer(this.cust).then(resp => {
            console.log('new cust resp modal', resp);
            if (resp) {
              this.ClearModel();
              this.us.presentToast('Cliente Creado exitosamente!', 'success').then(toast => {
                loader.dismiss();
                toast.onDidDismiss().then(() => {
                  this.modal.dismiss();
                });
              });
            } else {
              loader.dismiss();
            }
          });
        });
      }
    });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.logo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
        alert('Ha ocurrido un error con la camara. Descripcion:' + err);
        this.alertCtrl.create({
        header: 'Error!',
        message: 'Ha ocurrido un error. Descripcion: ' + err,
        buttons: [
          {
            text: 'Ok'
          }
        ]
      }).then(alert => alert.present());
    });
  }

  closeModal() {
    this.modal.dismiss();
  }

  ClearModel() {
    this.cust.address = '';
    this.cust.email = '';
    this.cust.brand = '';
    this.cust.contact = '';
    this.cust.name = '';
    this.cust.phone = '';
    this.cust.state = null;
  }

  validateForm(): Promise<boolean> {
    return new Promise(resolve => {
      if (!this.cust.email) {
        this.showErrorModel('Correo es requerido!');
        resolve(false);
        return;
      }
      this.us.validateEmail(this.cust.email).then(val => {
        if (!this.cust.name) {
        this.showErrorModel('Nombre es requerido!');
        resolve(false);
        return;
        } else if (!this.cust.contact) {
          this.showErrorModel('Contacto es requerido!');
          resolve(false);
          return;
        } else if (!this.cust.identType) {
          this.showErrorModel('Tipo Identificacion es requerido!');
          resolve(false);
          return;
        } else if (!this.cust.ident) {
          this.showErrorModel('Numero de Identificacion es requerido!');
          resolve(false);
          return;
        } else if (!val) {
          this.showErrorModel('Correo no válido, el correo debe tener un formato parecido a este: "correo@dominio.com"!');
          resolve(false);
          return;
        } else if (!this.cust.brand) {
          this.showErrorModel('Marca es requerido!');
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
  showErrorModel(msg: string) {
    this.us.presentToast(msg, 'danger').then(toast => toast.present());
  }
}
