import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { HomePage } from './pages/home/home';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  pages: Array<{ title: string, component: any, route: string, icon: string, cli: boolean, empl: boolean }>;
  profile: string;
  currentUserEmail: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'Ir al Inicio', component: HomePage, route: 'homepage', icon: 'home', cli: true, empl: true }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.router.navigate([page.route]);
  }

  onLogOff() {
    this.profile = null;
    this.afAuth.auth.signOut().then((resp) => {
      window.localStorage.clear();
      this.router.navigateByUrl('/loginpage');
    },
      err => console.log(err)
    );
  }
}
