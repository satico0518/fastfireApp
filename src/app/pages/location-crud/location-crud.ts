import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ICrud } from '../../interfaces/crud.interface';
import { CustomerModel } from '../../models/customer.model';
import { ModalController, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { EditLocationPage } from '../edit-location/edit-location';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanesCrudPage } from '../planes-crud/planes-crud';
import { NewLocationPage } from '../new-location/new-location';

@Component({
  selector: 'page-location-crud',
  templateUrl: 'location-crud.html',
  styleUrls: ['location-crud.scss']
})
export class LocationCrudPage implements ICrud, OnInit {
  cust: CustomerModel;
  locations: any[];

  constructor(
    public router: Router, private actRoute: ActivatedRoute, private modal: ModalController,
    private admSrvc: AdminService, private alert: AlertController,
    public us: UtilsService) {
      this.actRoute.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.cust = this.router.getCurrentNavigation().extras.state.obj;
        }
      });
  }

  ngOnInit(): void {
    this.getObj();
  }

  getObj() {
    this.us.presentLoading('cargando locaciones ...').then(loader => {
      this.admSrvc.getLocations(this.cust).then(data => {
          this.locations = data;
          loader.dismiss();
      });
    });
  }

  newObj() {
    this.modal.create({ component: NewLocationPage }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(() => this.getObj());
    });
  }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.locations = this.locations.filter((loc) => {
        return (loc.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.getObj();
    }
  }

  remove(loc) {
    this.alert.create({
      header: 'Confirmación',
      message: 'Realmente desea inactivar esta locación?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Inactivar',
          handler: () => {
            this.admSrvc.removeLocation(loc).then(resp => {
              if (resp) {
                this.us.presentToast('Locacion inhabilitada exitosamente!', 'success').then(toast => {
                  toast.present();
                  toast.onDidDismiss().then(() => this.getObj());
                });
              }
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }

  edit(obj: any) {
    this.modal.create({ component: EditLocationPage, componentProps: { obj }})
      .then(modal => {
        modal.present();
        modal.onDidDismiss().then(() => this.getObj());
      });
  }

  planes(loc) {
    const obj = { loc, cust: this.cust };
    this.router.navigate(['planescrudpage'], { state: { obj }});
  }

  closeModal() {
    this.modal.dismiss();
  }
}
