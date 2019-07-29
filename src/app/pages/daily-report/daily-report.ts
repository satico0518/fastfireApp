import { Component } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import { NavController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-daily-report',
  templateUrl: 'daily-report.html'
})
export class DailyReportPage {
  location: any;
  customer: any;
  memo: string;
  photos = [
    'https://static.miweb.padigital.es/var/m_4/42/420/51019/711652-imagen-no-disponible.jpg'
  ];

  constructor(
    public navCtrl: NavController,
    public actRoute: ActivatedRoute,
    private procSrvc: ProcessService,
    private camera: Camera,
    public alertCtrl: AlertController,
    public us: UtilsService,
    private authSrvc: AuthService,
    private router: Router
  ) {
    this.location = this.actRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.customer = this.procSrvc.currentCust;
        this.location = this.router.getCurrentNavigation().extras.state.loc;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SitetestPage');
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        if (this.photos[0].includes('no-disponible')) {
          this.photos = [];
        }
        this.photos.push('data:image/jpeg;base64,' + imageData);
      },
      err => {
        console.error('Ha ocurrido un error con la camara. Descripcion:' + err);
        this.alertCtrl
          .create({
            header: 'Error!',
            message: 'Ha ocurrido un error. Descripcion: ' + err,
            buttons: [
              {
                text: 'Ok'
              }
            ]
          })
          .then(errAlert => errAlert.present());
      }
    );
  }

  removePhoto(indx) {
    this.alertCtrl
      .create({
        header: 'Confirmación!',
        message: 'Realmente desea elminiar esta evidencia?',
        buttons: [
          {
            text: 'Eliminar',
            handler: () => {
              this.photos.splice(indx, 1);
              if (this.photos.length === 0) {
                this.photos.push(
                  'https://static.miweb.padigital.es/var/m_4/42/420/51019/711652-imagen-no-disponible.jpg'
                );
              }
            }
          },
          {
            text: 'Cancelar'
          }
        ]
      })
      .then(confirm => confirm.present());
  }

  sendDailyReport() {
    if (this.photos.length === 1 && this.photos[0].includes('no-disponible')) {
      this.alertCtrl
        .create({
          header: 'Advertencia!',
          message: 'No se ha tomado la evidencia del avance.',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        })
        .then(alert => alert.present());
      return;
    }
    this.us.presentLoading('Enviando Avance...').then(loader => {
      this.authSrvc.getCurrentUser().then(user => {
        const report = {
          customerId: this.procSrvc.currentCust.id,
          customer: this.procSrvc.currentCust.name,
          locationId: this.procSrvc.currentLoc.id,
          location: this.procSrvc.currentLoc.name,
          photos: this.photos,
          memo: this.memo,
          user: user.email,
          creationDate: new Date(),
          state: 'created'
        };

        this.procSrvc
          .saveDailyReport(report)
          .then((resp: any) => {
            console.log('SaveDailyReportt resp', resp);
            if (resp.id) {
              this.us.presentToast('Avance enviado exitosamente!', 'success').then(toast => {
                toast.onDidDismiss().then(() => {
                  this.navCtrl.navigateRoot('/');
                });
              });
            }
            loader.dismiss();
          })
          .catch(err => {
            this.alertCtrl.create({
              header: 'Error!',
              message: 'Error enviando avance.' + err.message,
              buttons: [
                {
                  text: 'Ok'
                }
              ]
            }).then(errAlert => errAlert.present());
            loader.dismiss();
          });
      });
    });
  }
}
