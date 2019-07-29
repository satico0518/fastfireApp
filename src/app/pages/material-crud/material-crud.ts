import { Component } from '@angular/core';
import { ProcessService } from '../../services/process.service';
import { AdminService } from '../../services/admin.service';
import { ICrud } from 'src/app/interfaces/crud.interface';
import { ModalController, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { NewMaterialPage } from '../new-material/new-material';
import { EditMaterialPage } from '../edit-material/edit-material';

@Component({
  selector: 'page-material-crud',
  templateUrl: 'material-crud.html',
})
export class MaterialCrudPage implements ICrud {
  materials: any[];

  constructor(
    private procSrvc: ProcessService,
    private admSrvc: AdminService,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private us: UtilsService) {
    this.getObj();
  }

  getObj() {
    this.us.presentLoading('cargando materiales...').then(loader => {
      this.procSrvc.getMaterials().then(list => {
        list.subscribe(data => {
          this.materials = data;
          loader.dismiss();
        });
      }, err => loader.dismiss());
    });
  }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.materials = this.materials.filter((mat) => {
        return (mat.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.getObj();
    }
  }

  newObj() {
    this.modalCtrl.create({ component: NewMaterialPage }).then(modal => modal.present());
  }

  remove(mat) {
    this.alert.create({
      header: 'Confirmación',
      message: 'Realmente desea eliminar este material?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.admSrvc.removeMaterial(mat.name).then(resp => {
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }

  edit(obj: any) {
    this.modalCtrl.create({ component: EditMaterialPage, componentProps: { obj }})
      .then(modal => modal.present());
  }
}
