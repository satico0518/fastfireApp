import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ICrud } from '../../interfaces/crud.interface';
import { UserModel } from '../../models/user.model';
import { UserAssignedLocationsPage } from '../user-assigned-locations/user-assigned-locations';
import { ProcessEnum } from '../../enums/process.enum';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-user-crud',
  templateUrl: 'user-crud.html'
})
export class UserCrudPage implements ICrud {
  opers: any[];
  custs: any[];
  admins: any[];

  constructor(
    public router: Router,
    private admSrvc: AdminService,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private us: UtilsService
  ) {}

  getObj(): Promise<void> {
    return new Promise(resolve => {
      this.us.presentLoading('cargando usuarios...').then(loader => {
        this.admSrvc.getUsers().subscribe(
          list => {
            this.opers = [];
            this.custs = [];
            this.admins = [];
            list.forEach(user => {
              switch (user.profile) {
                case 'oper':
                  this.opers.push(user);
                  break;
                case 'cust':
                  this.custs.push(user);
                  break;
                case 'admin':
                  this.admins.push(user);
                  break;
                default:
                  break;
              }
            });
            loader.dismiss();
            resolve();
          },
          err => loader.dismiss()
        );
      });
    });
  }

  newObj(): void {
    this.modalCtrl
      .create({ component: NewUserPage })
      .then(modal => modal.present());
  }

  edit(obj: any) {
    this.modalCtrl
      .create({ component: EditUserPage, componentProps: { obj } })
      .then(modal => modal.present());
  }

  remove(user: UserModel) {
    this.alert
      .create({
        header: 'Confirmación',
        message: 'Realmente desea inactivar este usuario?',
        buttons: [
          {
            text: 'Cancelar'
          },
          {
            text: 'Inactivar',
            handler: () => {
              this.admSrvc.removeUser(user).then(resp => {});
            }
          }
        ]
      })
      .then(alert => alert.present());
  }

  goToUserAssignedLocations(user) {
    this.admSrvc.userToAssignLocs = user;
    this.router.navigate(['userassignedlocationspage'], {
      state: {
        user,
        process: ProcessEnum.AssignLocsToUser
      }
    });
  }
}
