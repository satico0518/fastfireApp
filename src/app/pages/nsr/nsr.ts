import { Component } from '@angular/core';
import { FormatsService } from '../../services/formats.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-nsr',
  templateUrl: 'nsr.html'
})
export class NsrPage {
  nsrs: any;

  constructor(
    private frmSrvc: FormatsService,
    private us: UtilsService) {
    this.frmSrvc.getNsrs().then(resp => {
      this.nsrs = resp;
    });
  }

  downloadFile(uri, title) {
    this.us.downloadFile(uri, title, '.doc');
  }
}
