import { Component } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-sitetest',
  templateUrl: 'sitetest.html',
})
export class SitetestPage {

  location: any;
  customer: any;
  memo: string;
  testFormPics = ['https://static.miweb.padigital.es/var/m_4/42/420/51019/711652-imagen-no-disponible.jpg'];

  constructor(
    public router: Router, public actRoute: ActivatedRoute, private procSrvc: ProcessService,
    private camera: Camera, public alertCtrl: AlertController, private authSrvc: AuthService,
    private us: UtilsService) {
      this.actRoute.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.customer = this.procSrvc.currentCust;
          this.location = this.router.getCurrentNavigation().extras.state.loc;
        }
      });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      if (this.testFormPics.length === 1 && this.testFormPics[0].includes('no-disponible')) {
        this.testFormPics = [];
      }
      this.testFormPics.push('data:image/jpeg;base64,' + imageData);
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

  removePhoto(indx) {
    this.alertCtrl.create({
      header: 'Confirmación!',
      message: 'Realmente desea elminiar esta evidencia?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.testFormPics.splice(indx, 1);
            if (this.testFormPics.length === 0) {
              this.testFormPics.push('https://static.miweb.padigital.es/var/m_4/42/420/51019/711652-imagen-no-disponible.jpg');
            }
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    }).then(confirm => confirm.present());
  }

  sendTest() {
    if (this.testFormPics.length === 1 && this.testFormPics[0].includes('no-disponible')) {
      this.alertCtrl.create({
        header: 'Advertencia!',
        message: 'No se ha tomado la evidencia del formato y el manometro.',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      }).then(errAlert => { errAlert.present(); return; });
    }
    this.us.presentLoading('Enviando Prueba...').then(loader => {
      this.authSrvc.getCurrentUser().then(user => {
        const test = {
          customerId: this.procSrvc.currentCust.id,
          customer: this.procSrvc.currentCust.name,
          locationId: this.procSrvc.currentLoc.id,
          location: this.procSrvc.currentLoc.name,
          formpics: this.testFormPics,
          memo: this.memo,
          user: user.email,
          creationDate: new Date()
        };

        this.procSrvc.saveSiteTest(test).then(resp => {
          console.log('SaveInspect resp', resp);
          loader.dismiss();
          this.us.presentToast('Prueba enviada exitosamente!').then(toast => {
            toast.onDidDismiss().then(() => {
              this.router.navigate(['/']);
            });
          });
        });
      });
    });
  }
}
