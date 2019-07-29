import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { LocationModel } from '../../models/location.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-check-location-reports',
  templateUrl: 'check-location-reports.html',
  styleUrls: ['check-location-reports.scss']
})
export class CheckLocationReportsPage {

  reports: any[];
  currentLoc: LocationModel;
  loader: any;

  constructor(
    private actRoute: ActivatedRoute, public router: Router,
    private admSrvc: AdminService, public us: UtilsService) {
    this.actRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.currentLoc = this.router.getCurrentNavigation().extras.state.loc;
      }
    });
  }

  ionViewDidEnter() {
    this.us.presentLoading('cargando locaciones ...').then(loader => this.loader = loader);
    this.admSrvc.getLocationReports(this.currentLoc.key).subscribe(list => {
        this.reports = list;
        this.loader.dismiss();
      }, err =>  alert(JSON.stringify(err))
    );
  }

  goToDetail(report) {
    this.router.navigate(['reportdetailpage'], { state: { report }});
  }

}
