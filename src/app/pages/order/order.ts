import { Component } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UtilsService } from 'src/app/services/utils.service';
import { MaterialsPage } from '../materials/materials';
import { ReviewOrderPage } from '../review-order/review-order';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
  requestedMaterials = [];
  materials: any;
  photos = [
    'https://static.miweb.padigital.es/var/m_4/42/420/51019/711652-imagen-no-disponible.jpg'
  ];
  customer: any;
  location: any;
  memo: string;

  constructor(
    public router: Router,
    public actRoute: ActivatedRoute,
    private procSrvc: ProcessService,
    public modalCtrl: ModalController,
    private camera: Camera,
    public alertCtrl: AlertController,
    private authSrvc: AuthService,
    private us: UtilsService
  ) {
    this.actRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.customer = this.procSrvc.currentCust;
        this.location = this.router.getCurrentNavigation().extras.state.loc;
      }
    });
  }

  goToMaterials() {
    this.modalCtrl
      .create({
        component: MaterialsPage,
        componentProps: {
          requestedMaterials: this.requestedMaterials
        }
      })
      .then(modal => {
        modal.present();
        modal.onDidDismiss().then(data => {
          console.log('data', data);
        });
      });
  }

  async review() {
    if (this.requestedMaterials.length === 0) {
      await this.alertCtrl
        .create({
          header: 'Información!',
          message: 'No se ha realizado pedido',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        })
        .then(alert => alert.present());
      return;
    }
    this.modalCtrl
      .create({
        component: ReviewOrderPage,
        componentProps: {
          order: this.requestedMaterials
        }
      })
      .then(modal => {
        modal.present();
        modal.onDidDismiss().then((data: any) => {
          console.log('data', data);
          this.requestedMaterials = data;
        });
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
      if (this.photos.some(x => x.toString().includes('no-disponible'))) {
        this.photos = [];
      }
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(base64Image);
      this.photos.reverse();
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
      .then(alert => alert.present());
  }

  async sendOrder() {
    if (this.photos.length === 1 && this.photos[0].includes('no-disponble')) {
      await this.alertCtrl
        .create({
          header: 'Advertencia',
          message: 'No se han tomado evidencias de la inspección!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        })
        .then(alert => alert.present());
      return;
    }
    if (this.requestedMaterials.length === 0) {
      await this.alertCtrl
        .create({
          header: 'Advertencia',
          message: 'No se ha registardo pedido de materiales!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        })
        .then(alert => alert.present());
      return;
    }
    if (!this.memo || this.memo.length === 0) {
      await this.alertCtrl
        .create({
          header: 'Advertencia',
          message: 'No se ha registardo observación!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        })
        .then(alert => alert.present());
      return;
    }
    this.us.presentLoading('Enviando Orden...').then(loader => {
      this.authSrvc.getCurrentUser().then(user => {
        const insp = {
          customerId: this.procSrvc.currentCust.id,
          customer: this.procSrvc.currentCust.name,
          locationId: this.procSrvc.currentLoc.id,
          location: this.procSrvc.currentLoc.name,
          images: this.photos,
          order: this.requestedMaterials,
          memo: this.memo,
          user: user.email
        };
        // console.log('final insp', insp);
        this.procSrvc.saveInspect(insp).then(resp => {
          // console.log('SaveInspect resp', resp);
          this.us
            .presentToast('Inspección enviada exitosamente!')
            .then(toast => {
              loader.dismiss();
              toast.onDidDismiss().then(() => {
                this.router.navigate(['/']);
              });
            });
        });
      });
    });
  }
}
