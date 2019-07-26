import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminService } from 'src/app/services/admin.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ProcessEnum } from 'src/app/enums/process.enum';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomePage {
  userProfile: string;
  email: string;
  today: string;
  pendingInspectsNumber = 0;
  pendingDailyNumber = 0;
  pendingRetroNumber = 0;
  processInps = ProcessEnum.Inpection;
  processPlanes = ProcessEnum.Planes;
  processSiteTest = ProcessEnum.SiteTest;
  processDailyReport = ProcessEnum.DailyReport;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    private authServ: AuthService,
    private adminSrvc: AdminService,
    private ln: LocalNotifications
  ) {
    authServ.getCurrentUser().then(usr => {
      this.userProfile = usr.profile;
      this.email = usr.email;
    });
    const dt = new Date();
    const month = (dt.getMonth() + 1).toString();
    this.today = `${dt.getDate()}/${
      month.length === 1 ? '0' + month : month
    }/${dt.getFullYear()}`;
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(state => {
      alert('state ' + JSON.stringify(state));
      if (!state) {
        this.router.navigate(['loginpage']);
      } else {
        this.authServ.getCurrentUser().then(usr => {
          this.userProfile = usr.profile;
          if (this.userProfile === 'admin') {
            this.adminSrvc.getCreatedInspections().subscribe(obs => {
              // console.log('inspect obs', obs);
              if (obs.length > 0 && this.pendingInspectsNumber < obs.length) {
                this.ln.schedule({
                  title: 'Nueva Inspección',
                  text: `Tiene ${
                    obs.length
                  } inspecciones(s) pendiente por chequear!`,
                  icon:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIe48KomGAZOWZIprWWfXghCtLmpyrd4PmLJvVw0il3LaHTIGMA'
                });
              }
              this.pendingInspectsNumber = obs.length;
            });
            this.adminSrvc.getCreatedReports().subscribe(obs => {
              // console.log('reports obs', obs);
              if (obs.length > 0 && this.pendingDailyNumber < obs.length) {
                this.ln.schedule({
                  title: 'Nuevo avance',
                  text: `Tiene ${obs.length} avance(s) pendiente por chequear!`,
                  icon:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeVv2t9kbUzg4pXzGyzlRb4bmdnuxH17DdoCGFNvkLm0gfe_4iUA'
                });
              }
              this.pendingDailyNumber = obs.length;
            });
          }
        });
      }
    });
  }

  goToCustomers(process: string) {
    // this.router.navigate(CustomersPage, { process });
  }

  goToCheckInspections() {
    // this.router.navigate(CheckInspectionsPage);
  }
  goToCheckReports() {
    // this.router.navigate(CheckDailyReportsPage);
  }

  goToCheckRetros() {
    alert('Proximamente!');
  }

  checkDailyReports() {
    // this.authServ.getCurrentUser().then(user =>
    //   this.router.navigate(UserAssignedLocationsPage, {
    //     user,
    //     process: ProcessEnum.CustomerCheck
    //   })
    // );
  }

  ionViewDidEnter() {
    this.authServ.getCurrentUser().then(user => {
      this.email = user.email;
    });
  }
}