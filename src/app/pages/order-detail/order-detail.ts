import { Component } from '@angular/core';
import { ReviewOrderPage } from '../review-order/review-order';
import { AdminService } from '../../services/admin.service';
import { UtilsService } from '../../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html'
})
export class OrderDetailPage {
  requestedMaterials = [];
  order: any = {};

  constructor(
    public router: Router,
    public actRoute: ActivatedRoute,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private admnSrvc: AdminService,
    public us: UtilsService
  ) {
    this.actRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.order = this.router.getCurrentNavigation().extras.state.insp;
      }
    });
  }

  review() {
    if (this.order.order.length === 0) {
      this.alertCtrl
        .create({
          header: 'Información!',
          message: 'No se ha realizado pedido',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        })
        .then(alert => {
          alert.present();
          return;
        });
    }
    this.modalCtrl
      .create({
        component: ReviewOrderPage,
        componentProps: {
          order: this.order.order
        }
      })
      .then(modal => {
        modal.present();
      });
  }

  goToViewer(img) {
    this.us.goToViewer(img);
  }

  checkOrder() {
      this.alertCtrl
        .create({
          header: 'Confirmación',
          message: 'Realmente desea chequear esta inspección?',
          buttons: [
            {
              text: 'Cancelar'
            },
            {
              text: 'Chequear',
              handler: () => {
                this.us.presentLoading('Chequeando inspección...').then(loader => {
                this.admnSrvc
                  .checkInspection(this.order.creationDate)
                  .then(resp => {
                    if (resp) {
                      loader.dismiss();
                      this.us
                        .presentToast('Inspección Chequeada exitosamente!', 'success')
                        .then(toast => {
                          toast.present();
                          toast.onDidDismiss().then(() => {
                            this.router.navigate(['/']);
                          });
                        });
                    }
                  });
                });
              }
            }
          ]
        }).then(alert => alert.present());
  }
}
