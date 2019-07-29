import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as UserModel;
  userDb: Observable<any>;
  errorMsg: string;

  constructor(
    public router: Router, public afAuth: AngularFireAuth,
    private toastCtrl: ToastController, private authSrvc: AuthService) {

  }

  login() {
    try {
      if (!this.user.email) {
        this.presentToast('badly formatted', 'danger');
        return;
      }
      this.afAuth.auth.signInWithEmailAndPassword(this.user.email.toLowerCase().trim(), this.user.pass).then(resp => {
        // console.log('login response', resp);
        if (resp) {
          this.authSrvc.setCurrentUser(this.user).then((success) => {
            if (success) {
              this.authSrvc.userChange.next(this.user);
              this.router.navigate(['homepage']);
              this.errorMsg = '';
            }
          });
        }
      }, (e) => this.presentToast(e.message, 'danger'))
        .catch((e) => this.presentToast(e.message, 'danger'));
    } catch (e) {
      this.presentToast(e.message, 'danger');
      console.error('Error de Login: ', e);
    }
  }

  async presentToast(message: string, color: string) {
    if (message.includes('badly formatted')) {
      this.errorMsg = 'Formato inválido de correo!';
    } else if (message.includes('First argument "email" must be a valid string')) {
      this.errorMsg = 'El Correo ingresado no es válido!';
    } else if (message.includes('There is no user record corresponding to this identifier')) {
      this.errorMsg = 'El Correo ingresado no existe!';
    } else if (message.includes('The password is invalid')) {
      this.errorMsg = 'Contraseña errada!';
    } else {
      this.errorMsg = message;
    }
    const toast = await this.toastCtrl.create({
      message: this.errorMsg,
      duration: 5000,
      position: 'bottom',
      color
    });
    toast.present();
  }

}
