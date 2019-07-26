import { Component } from '@angular/core';
import { FormatsService } from 'src/app/services/formats.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'page-formats',
  templateUrl: 'formats.html',
  styleUrls: ['formats.scss']
})
export class FormatsPage {
  formats: any;

  constructor(
    private frmSrvc: FormatsService,
    private iab: InAppBrowser) {
    this.frmSrvc.getFormats().then(resp => {
      this.formats = resp;
    });
  }

  viewFormat(url: string) {
    const urlEncode = encodeURIComponent(url);
    this.iab.create('https://docs.google.com/viewer?url=' + urlEncode);
  }

}
