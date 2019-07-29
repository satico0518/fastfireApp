import { Component } from '@angular/core';
import { SettingsPagesEnum } from 'src/app/enums/settings-pages.enum';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-database',
  templateUrl: 'database.html',
  styleUrls: ['database.scss']
})
export class DatabasePage {
  settings = [{
    page: SettingsPagesEnum.MaterialCRUD,
    icon: 'md-construct',
    name: 'Administracion de Materiales',
    description: 'Crear, editar o eliminar materiales'
  }, {
    page: SettingsPagesEnum.UsersCRUD,
    icon: 'md-contacts',
    name: 'Administracion de Usuarios',
    description: 'Crear, editar o inactivar usuarios'
  }, {
    page: SettingsPagesEnum.CustomerCRUD,
    icon: 'md-pin',
    name: 'Administracion de Clientes',
    description: 'Crear, editar o inactivar clientes'
  }];

  constructor(
    public router: Router,
    public us: UtilsService) {
  }

  ionViewDidLoad() {
  }

  goToItemPage(page) {
    switch (page) {
      case SettingsPagesEnum.MaterialCRUD:
        this.router.navigate(['materialcrudpage']);
        break;
      case SettingsPagesEnum.UsersCRUD:
        this.router.navigate(['usercrudpage']);
        break;
      case SettingsPagesEnum.CustomerCRUD:
        this.router.navigate(['customercrudpage']);
        break;
      default:
        break;
    }
  }
}
