import { Component } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { AdminService } from '../../services/admin.service';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-edit-material',
  templateUrl: 'edit-material.html',
})
export class EditMaterialPage {

  img: string;
  name: string;
  initialName: string;
  price: number;
  constructor(
    public modal: ModalController, private camera: Camera, public alertCtrl: AlertController,
    private admSrvc: AdminService, public us: UtilsService,
    private navParams: NavParams
    ) {
      const tempMat = this.navParams.get('obj');
      this.img = tempMat.icon;
      this.name = this.initialName = tempMat.name;
      this.price = tempMat.price;
  }

  edit() {
    this.us.presentLoading('editando material...').then(loader => {
      this.admSrvc.editMaterial({initialName : this.initialName, icon: this.img, name: this.name, price: this.price}).then(resp => {
        console.log('edit resp modal', resp);
        if (resp) {
          this.name = '';
          this.price = 0;
          this.us.presentToast('Material Editado exitosamente!', 'success').then(toast => {
            loader.dismiss();
            toast.present();
            toast.onDidDismiss().then(() => {
              this.modal.dismiss();
            });
          });
        }
      });
    });
  }

  goBack() {
    this.modal.dismiss();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.img = 'data:image/jpeg;base64,' + imageData;
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
      }).then(errAlert => errAlert.present());
    });
  }
}
