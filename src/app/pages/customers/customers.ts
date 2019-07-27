import { Component } from '@angular/core';
import { ProcessEnum } from 'src/app/enums/process.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessService } from 'src/app/services/process.service';
import { LoadingController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {

  customers: any;
  currentProcess: ProcessEnum;
  title: string;
  loadingElement: any;

  constructor(
    public actRoute: ActivatedRoute, public router: Router, private procSrvc: ProcessService,
    public loadingCtrl: LoadingController, private us: UtilsService,
    private as: AuthService) {
      this.actRoute.queryParams.subscribe(() => {
        if (router.getCurrentNavigation().extras.state) {
          this.currentProcess = router.getCurrentNavigation().extras.state.process;
          this.title = this.us.getTitleByProcess(this.currentProcess);
        }
      });
  }

  ionViewDidEnter() {
    this.initializeItems();
  }

  initializeItems() {
    this.us.presentLoading('Cargando clientes...').then(loader => this.loadingElement = loader);
    this.as.getCurrentUser().then(usr => {
      if (this.currentProcess === ProcessEnum.CheckHistInspLoc
        || this.currentProcess === ProcessEnum.CheckHistInspOper
        || this.currentProcess === ProcessEnum.CheckHistReportLoc
        || this.currentProcess === ProcessEnum.CheckHistReportOper
        || this.currentProcess === ProcessEnum.AssignLocsToUser) {
        this.procSrvc.getCustomers().then((list: any) => {
          // console.log('customers', list);
          this.customers = list;
          this.loadingElement.dismiss();
        }).catch(err => this.loadingElement.dismiss());
      } else {
        this.procSrvc.getAssignedCustomers(usr.id).then((list: any) => {
          // console.log('customers', list);
          this.customers = list;
          this.loadingElement.dismiss();
        }).catch(err => this.loadingElement.dismiss());
      }

    });
  }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.customers = this.customers.filter((cust) => {
        return (cust.data.brand.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else { this.initializeItems(); }
  }

  goToLocations(cust) {
    this.procSrvc.currentCust = { id: cust.id, name: cust.data.name, brand: cust.data.brand, icon: cust.data.icon };
    this.router.navigate(['locationspage'], { state: { custId: cust.id, process: this.currentProcess } });
  }
}
