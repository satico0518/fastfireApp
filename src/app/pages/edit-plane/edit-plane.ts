import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-edit-plane',
  templateUrl: 'edit-plane.html',
})
export class EditPlanePage {

  locKey: string;
  plane = {} as { name: string, url: string, state: boolean, key: string };
  constructor(
    public modal: ModalController, public alertCtrl: AlertController,
    private admSrvc: AdminService, public us: UtilsService,
    private navParams: NavParams, private camera: Camera) {
      const prms = this.navParams.get('obj');
      this.plane.key = prms.pln.key;
      this.plane.name = prms.pln.name;
      this.plane.url = prms.pln.url;
      this.plane.state = prms.pln.state;
      this.locKey = prms.loc.key;
      console.log(this.plane);
      
  }

  edit() {
    this.us.presentLoading('editando plano...').then(loader => {
      this.plane.state = JSON.parse(this.plane.state.toString());
      this.admSrvc.editPlane(this.plane, this.locKey).then(resp => {
        console.log('edit pln resp modal', resp);
        if (resp) {
          this.us.presentToast('Plano Editado exitosamente!', 'success').then(toast => {
            loader.dismiss();
            toast.onDidDismiss().then(() => {
              this.modal.dismiss();
            });
          });
        } else {
          loader.dismiss();
        }
      }).catch(err => {
        console.error('Error edit pln resp modal: ', err);
      });
    });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.plane.url = 'data:image/jpeg;base64,' + imageData;
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

  upload() {

  }

  closeModal() {
    this.modal.dismiss();
  }

}
