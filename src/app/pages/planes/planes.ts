import { Component } from '@angular/core';
import { PlaneService } from '../../services/plane.service';
import { ProcessService } from '../../services/process.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-planes',
  templateUrl: 'planes.html'
})
export class PlanesPage {
  location: any;
  customer: any;
  planes: any;

  constructor(
    private procSrvc: ProcessService,
    private router: Router,
    private planeSrvc: PlaneService,
    private iab: InAppBrowser,
    private actRoute: ActivatedRoute,
    public us: UtilsService
  ) {
    this.customer = this.procSrvc.currentCust;
    this.actRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.location = this.router.getCurrentNavigation().extras.state.loc;
        this.planeSrvc
          .getPlanesByLocation(this.customer.id, this.location.id)
          .then(resp => {
            console.log('resp planes', resp);
            this.planes = resp;
          });
      }
    });
  }

  viewPlane(urlParam: string) {
    const url = encodeURIComponent(urlParam);
    this.iab.create('https://docs.google.com/viewer?url=' + url);
  }
}
