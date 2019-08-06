import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { LocationModel } from '../../models/location.model';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'page-new-plane',
  templateUrl: 'new-plane.html',
})
export class NewPlanePage {
  img = this.us.notAvailableImage;
  name: string;
  loc: LocationModel;
  planeObj: any;
  constructor(
    public modal: ModalController, public alertCtrl: AlertController, private camera: Camera,
    private admSrvc: AdminService, private authSrvc: AuthService, private navParams: NavParams,
    private fp: FilePath, private fc: FileChooser,
    private file: File, public us: UtilsService) {
      this.loc = this.navParams.get('obj');
  }

  add() {
    this.us.presentLoading('creando plano...').then(loader => {
      this.authSrvc.getCurrentUser().then(user => {
        this.admSrvc.newPlane({
          name: this.name,
          state: true,
          uploadDate: new Date(),
          uploadUser: user.email,
          url: this.img },
          this.loc.key, this.planeObj || null).then(resp => {
          console.log('new plane resp modal', resp);
          if (resp) {
            this.name = '';
            this.img = this.us.notAvailableImage;
            this.us.presentToast('Plano Creado exitosamente!').then(toast => {
              loader.dismiss();
              toast.onDidDismiss().then(() => {
                this.modal.dismiss();
              });
            });
          } else {
            loader.dismiss();
          }
        }, (err) => loader.dismiss());
      });
    });
  }

  chooseFile() {
    if (!this.name || this.name === '') {
        this.alertCtrl.create({
        header: 'Aviso!!',
        message: 'Debe asignar un nombre al plano.',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      }).then(alert => {
        alert.present();
        return;
      });
    } else {
      this.fc.open().then(file => {
        this.fp.resolveNativePath(file).then(resolvedPath => {
          this.file.resolveLocalFilesystemUrl(resolvedPath).then(newUrl => {
            let dirPath = newUrl.nativeURL;
            const segms = dirPath.split('/');
            segms.pop();
            dirPath = segms.join('/');
            this.file.readAsArrayBuffer(dirPath, newUrl.name).then(buff => {
              this.uploadToStorage(buff);
            });
          });
        });
      });
    }
  }

  uploadToStorage(buff) {
    this.planeObj = new Blob([buff], {type: 'application/pdf'});
    this.add();
  }

  takePhoto() {
    if (!this.name || this.name === '') {
      this.alertCtrl.create({
        header: 'Aviso!!',
        message: 'Debe asignar un nombre al plano',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      }).then(alert => {
        alert.present();
        return;
      });
    }
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.img = 'data:image/jpeg;base64,' + imageData;
      this.add();
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
}
