import { Component } from '@angular/core';
import { FormatsService } from '../../services/formats.service';

@Component({
  selector: 'page-nsr',
  templateUrl: 'nsr.html',
})
export class NsrPage {

  nsrs: any;

  constructor(private frmSrvc: FormatsService) {
    this.frmSrvc.getNsrs().then(resp => {
      this.nsrs = resp;
    });
  }
}
