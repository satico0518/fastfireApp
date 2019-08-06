import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ICrud } from '../../interfaces/crud.interface';
import { CustomerModel } from '../../models/customer.model';
import { ModalController, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { LocationCrudPage } from '../location-crud/location-crud';
import { EditCustomerPage } from '../edit-customer/edit-customer';
import { NewCustomerPage } from '../new-customer/new-customer';
import { Router } from '@angular/router';

@Component({
  selector: 'page-customer-crud',
  templateUrl: 'customer-crud.html',
  styleUrls: ['customer-crud.scss']
})
export class CustomerCrudPage implements ICrud {

  customers: CustomerModel[];
  constructor(
    private admSrvc: AdminService,
    public modal: ModalController,
    private alert: AlertController,
    private router: Router,
    public us: UtilsService) {
      this.getObj();
  }

  initializeItems() {
    this.us.presentLoading('cargando clientes').then(loader => {
      this.admSrvc.getCustomers().then(list => {
          this.customers = list;
          loader.dismiss();
      }, err => loader.dismiss());
    });
  }

  getObj(): void {
    this.initializeItems();
  }

  newObj(): void {
    this.modal.create({ component: NewCustomerPage }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(() => this.initializeItems());
    });
  }

  edit(obj: CustomerModel) {
    this.modal.create({ component: EditCustomerPage, componentProps: { obj }})
    .then(modal => {
      modal.present();
      modal.onDidDismiss().then(() => this.initializeItems());
    });
  }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.customers = this.customers.filter((cust) => {
        return (cust.brand.toLowerCase().indexOf(val.toLowerCase().trim()) > -1);
      });
    } else {
      this.initializeItems();
    }
  }

  remove(user: CustomerModel) {
    this.alert.create({
      header: 'Confirmación',
      message: 'Realmente desea inactivar este cliente?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Inactivar',
          handler: () => {
            this.admSrvc.removeCustomer(user).then(() => {
              this.us.presentToast('Cliente Inactivado!', 'success').then(toast => toast.present());
              this.initializeItems();
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }

  locations(obj: CustomerModel) {
    this.router.navigate(['locationcrudpage'], { state :  { obj }});
    // this.modal.create({ component: LocationCrudPage, componentProps:})
    //   .then(modal => modal.present());
  }
}
