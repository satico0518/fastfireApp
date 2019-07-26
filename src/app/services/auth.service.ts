import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AuthService {

    userChange: Subject<UserModel> = new Subject<UserModel>();
    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, public alertCtrl: AlertController) { }

    setCurrentUser(user: UserModel) {
        return new Promise((resolve, reject) => {
            this.afs.collection('users', ref => ref.where('email', '==', user.email).where('state', '==', true))
            .get().subscribe((userResp: any) => {
                // console.log('user from db', user.docs[0].data());
                if (userResp.empty) {
                    this.alertCtrl.create({
                        header: 'Alert',
                        message: 'El correo ingresado no tiene un usuario asignado o se encuentra inactivo!',
                        buttons: ['ok']
                    }).then((alert) => alert.present);
                    resolve(false);
                    return;
                }
                localStorage.setItem('user', JSON.stringify(userResp.docs[0].data()));
                resolve(true);
            });
        });
    }

    getCurrentUser(): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem('user')) {
                const usr = JSON.parse(localStorage.getItem('user')) as UserModel;
                resolve(usr);
            }
        });
    }

    isAuth() {
        return new Observable<boolean>(obs => {
            this.afAuth.authState.subscribe(auth => {
                if (auth) {
                    obs.next(true);
                } else {
                    obs.next(false);
                }

                obs.complete();
            });
        });
    }

}

