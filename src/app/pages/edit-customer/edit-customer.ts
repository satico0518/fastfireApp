import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CustomerModel } from '../../models/customer.model';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-edit-customer',
  templateUrl: 'edit-customer.html',
  styleUrls: ['edit-customer.scss']
})
export class EditCustomerPage {

  cust = new CustomerModel();
  constructor(
    public modal: ModalController, public alertCtrl: AlertController,
    private admSrvc: AdminService, private navParams: NavParams,
    private camera: Camera, public us: UtilsService) {
      this.cust = this.navParams.get('obj');
  }

  edit() {
    this.us.presentLoading('editando cliente...').then(loader => {
      this.admSrvc.editCustomer(this.cust).then(resp => {
        console.log('edit resp modal', resp);
        if (resp) {
          this.ClearModel();
          this.us.presentToast('Usuario Editado exitosamente!', 'success').then(toast => {
            loader.dismiss();
            toast.onDidDismiss().then(() => {
              this.modal.dismiss();
            });
          });
        }
      });
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
      this.cust.icon = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.error('Ha ocurrido un error con la camara. Descripcion:' + err);
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
}
