import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-review-order',
  templateUrl: 'review-order.html',
})
export class ReviewOrderPage {

  orderList: any[];

  constructor(
    public navParams: NavParams,
    public modal: ModalController,
    public us: UtilsService) {
        this.orderList = this.navParams.get('order');
        console.log('constructor', this.orderList);
  }

  remove(i) {
    this.orderList.splice(i, 1);
  }

  closeModal() {
    this.modal.dismiss();
  }
}
