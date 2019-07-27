import { Component } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import { AlertController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'page-materials',
  templateUrl: 'materials.html'
})
export class MaterialsPage {
  requestedMaterials = [];
  materials: any;

  constructor(
    private navParams: NavParams,
    private procSrvc: ProcessService,
    private alertCtrl: AlertController,
    public modal: ModalController
  ) {
    this.requestedMaterials = this.navParams.get('requestedMaterials');
  }

  ionViewDidEnter() {
    this.procSrvc.getMaterials().then(list => {
      list.subscribe(data => {
        this.materials = data;
      });
    });
  }

  closeModal() {
    this.modal.dismiss();
  }

  showPrompt(name: string) {
    this.alertCtrl.create({
      header: name,
      message: 'Ingrese la cantidad a solicitar y el tamaño en pulgadas!',
      inputs: [
        {
          placeholder: 'Cantidad',
          name: 'cantidad',
          type: 'number'
        },
        {
          placeholder: 'Pulgadas. Ej 0.5, 2, 5.5',
          name: 'pulgadas',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {}
        },
        {
          text: 'Guardar',
          handler: data => {
            if (data.cantidad === '' || data.pulgadas === '') {
              this.alertCtrl.create({
                header: 'Error',
                message: 'Debe ingresar una cantidad y su medida en pulgadas!',
                buttons: ['Ok']
              }).then(altr => altr.present());
            } else {
              this.requestedMaterials.push({
                name,
                qty: data.cantidad as number,
                inches: data.pulgadas as number
              });
            }
          }
        }
      ]
    }).then(prompt => prompt.present());
    console.log('requestedMaterials', this.requestedMaterials);
  }
}
