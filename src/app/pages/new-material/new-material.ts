import { Component } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { AdminService } from '../../services/admin.service';
import { ModalController, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-new-material',
  templateUrl: 'new-material.html',
})
export class NewMaterialPage {

  img = 'https://static.miweb.padigital.es/var/m_4/42/420/51019/711652-imagen-no-disponible.jpg';
  name: string;
  price = 0;
  constructor(
    private modalCtrl: ModalController, private camera: Camera, public alertCtrl: AlertController,
    private admSrvc: AdminService, public us: UtilsService) {
  }

  add() {
    if (!this.name) {
      this.us.presentToast('Debe asignar un nombre al material!', 'danger').then(toast => {
        toast.present();
      });
    } else {
      this.us.presentLoading('creando material...').then(loader => {
        this.admSrvc.newMaterial({icon: this.img, name: this.name, price: this.price}).then(resp => {
          // console.log('new resp modal', resp);
          if (resp) {
            this.name = '';
            this.price = 0;
            this.us.presentToast('Material Creado exitosamente!', 'success').then(toast => {
                toast.present();
                loader.dismiss();
                toast.onDidDismiss().then(() => {
                  this.modalCtrl.dismiss();
                });
            });
          }
        }, err => loader.dismiss());
      });
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
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
      }).then(alert => alert.present());
    });
  }
}
