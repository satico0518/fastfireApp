import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { CustomerModel } from '../models/customer.model';
import { LocationModel } from '../models/location.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AdminService {
  currentCustID: string;
  userToAssignLocs: UserModel;
  errorMsg: string;
  constructor(
    protected afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private afStorage: AngularFireStorage
  ) { }

  getCreatedInspections(): Observable<any[]> {
    return this.afs
      .collection('inspections', ref =>
        ref.where('state', '==', 'created').orderBy('creationDate', 'desc')
      )
      .valueChanges();
  }

  getCreatedReports(): Observable<any[]> {
    return this.afs
      .collection('dailyreport', ref =>
        ref.where('state', '==', 'created').orderBy('creationDate', 'desc')
      )
      .valueChanges();
  }

  getHistoricInspectionsByLoc(locId: string): Observable<any[]> {
    return this.afs
      .collection('inspections', ref =>
        ref
          .where('state', '==', 'checked')
          .where('locationId', '==', locId)
          .orderBy('creationDate', 'desc')
      )
      .valueChanges();
  }
  getHistoricInspectionsByOper(operEmail: string): Observable<any[]> {
    return this.afs
      .collection('inspections', ref =>
        ref
          .where('state', '==', 'checked')
          .where('user', '==', operEmail)
          .orderBy('creationDate', 'desc')
      )
      .valueChanges();
  }
  getHistoricDailyReportsByLoc(locId: string): Observable<any[]> {
    return this.afs
      .collection('dailyreport', ref =>
        ref
          .where('state', '==', 'checked')
          .where('locationId', '==', locId)
          .orderBy('creationDate', 'desc')
      )
      .valueChanges();
  }
  getHistoricDailyReportsByOper(operEmail: string): Observable<any[]> {
    return this.afs
      .collection('dailyreport', ref =>
        ref
          .where('state', '==', 'checked')
          .where('user', '==', operEmail)
          .orderBy('creationDate', 'desc')
      )
      .valueChanges();
  }

  checkInspection(creationDate: Date): Promise<boolean> {
    return new Promise(resolve => {
      this.afs
        .collection('inspections', ref => ref.where('creationDate', '==', creationDate))
        .get()
        .subscribe(snap => {
          console.log('id', snap.docs[0].id);
          this.afs
            .collection('inspections')
            .doc(snap.docs[0].id)
            .update({ state: 'checked' })
            .then(resp => {
              console.log('checked insp resp', resp);
              resolve(true);
            })
            .catch(err => resolve(false));
        });
    });
  }
  checkReport(creationDate: Date): Promise<boolean> {
    return new Promise(resolve => {
      this.afs
        .collection('dailyreport', ref => ref.where('creationDate', '==', creationDate))
        .get()
        .subscribe(snap => {
          console.log('id', snap.docs[0].id);
          this.afs
            .collection('dailyreport')
            .doc(snap.docs[0].id)
            .update({ state: 'checked' })
            .then(resp => {
              console.log('checked report resp', resp);
              resolve(true);
            })
            .catch(err => resolve(false));
        });
    });
  }

  //#region User
  getUsers(): Observable<any[]> {
    return this.afs.collection('users').valueChanges();
  }

  newUser(user: UserModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afAuth.auth
          .createUserWithEmailAndPassword(user.email, 'ff12345')
          .then((resp: any) => {
            console.log('ok creacion ID', resp.uid);
            user.id = resp.uid;
            const usrObj = {
              id: user.id,
              email: user.email,
              pass: 'ff12345',
              name: user.name,
              identType: user.identType,
              ident: user.ident,
              lastname: user.lastname || '',
              address: user.address || '',
              phone: user.phone || '',
              profile: user.profile,
              state: true
            };
            // console.log('user', usrObj);
            this.afs
              .collection('users')
              .add(usrObj)
              .then(() => {
                // console.log('new resp srvc', resp);
                resolve(true);
              })
              .catch(err => {
                this.presentToast(err.message).then(() => resolve(false));
              });
          })
          .catch(err => {
            console.log('error de creacion', err);
            this.presentToast(err.message).then(() => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }

  editUser(user: UserModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afs.collection('users', ref => ref.where('email', '==', user.email))
          .get()
          .subscribe(snap => {
            console.log('id', snap.docs[0].id);
            user.state = JSON.parse(user.state.toString());
            this.afs
              .collection('users')
              .doc(snap.docs[0].id)
              .update(user)
              .then(resp => {
                console.log('edited resp', resp);
                resolve(true);
              })
              .catch(err => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }

  removeUser(user): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afs.collection('users', ref => ref.where('email', '==', user.email))
          .get()
          .subscribe(snap => {
            console.log('id', snap.docs[0].id);
            this.afs
              .collection('users')
              .doc(snap.docs[0].id)
              .update({
                id: user.id,
                email: user.email,
                pass: user.pass || 'ff12345',
                name: user.name,
                identType: user.identType,
                ident: user.ident,
                lastname: user.lastname,
                address: user.address,
                phone: user.phone,
                profile: user.profile,
                state: false
              })
              .then(resp => {
                console.log('deleted resp', resp);
                resolve(true);
              })
              .catch(err => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }

  getUserAssignedLocations(userId: string): Promise<any> {
    return new Promise(resolve => {
      this.afs.collection('users', ref => ref.where('id', '==', userId))
        .get()
        .subscribe(user => {
          if (!user.empty) {
            const locsArray = [];
            const currentUserRef = user.docs[0].ref;
            currentUserRef
              .collection('assignedLocs')
              .get()
              .then(locs => {
                if (locs.docs.length === 0) {
                  resolve([]);
                }
                locs.docs.forEach(locKey => {
                  this.getLocationByKey(locKey.data().loc).then(locObj => {
                    locsArray.push(locObj);
                  });
                });
                resolve(locsArray);
              });
          } else {
            resolve(null);
          }
        });
    });
  }

  authorizeLocToUser(loc) {
    return new Promise(resolve => {
      try {
        this.afs
          .collection('users', ref => ref.where('id', '==', this.userToAssignLocs.id))
          .get()
          .subscribe(obj => {
            // console.log('id', obj.docs[0].id);
            this.afs
              .collection('users')
              .doc(obj.docs[0].id)
              .collection('assignedLocs')
              .add({ loc: loc.id })
              .then(resp => {
                console.log('resp', resp);
                resp.id ? resolve(true) : resolve(false);
              })
              .catch(err => {
                alert(JSON.stringify(err));
              });
          });
      } catch (error) {
        alert(JSON.stringify(error));
      }
    });
  }

  removeAssignedLoc(loc: any): Promise<boolean> {
    return new Promise(resolve => {
      this.afs
        .collection('users', ref => ref.where('id', '==', this.userToAssignLocs.id))
        .get()
        .subscribe(user => {
          user.docs[0].ref
            .collection('assignedLocs')
            .where('loc', '==', loc.key)
            .get()
            .then((locResolved: any) => {
              locResolved.docs[0].ref
                .delete()
                .then(() => {
                  resolve(true);
                })
                .catch(err => alert(JSON.stringify(err)));
            })
            .catch(err => alert(JSON.stringify(err)));
        },
        err => alert(JSON.stringify(err))
        );
    });
  }
  // endregion

  //#region Customer
  getCustomers(): Observable<any[]> {
    return this.afs.collection('customers').valueChanges();
  }
  newCustomer(cust: CustomerModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const usrObj = {
          name: cust.name,
          brand: cust.brand,
          identType: cust.identType,
          ident: cust.ident,
          contact: cust.contact,
          email: cust.email,
          address: cust.address,
          phone: cust.phone,
          icon: cust.icon,
          state: true
        } as CustomerModel;
        console.log('cust', usrObj);

        this.afs
          .collection('customers')
          .add(usrObj)
          .then(resp => {
            console.log('new cust resp srvc', resp);
            resolve(true);
          })
          .catch(err => {
            this.presentToast(err.message).then(() => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }
  editCustomer(cust: CustomerModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afs.collection('customers', ref => ref.where('ident', '==', cust.ident))
          .get()
          .subscribe(snap => {
            console.log('id', snap.docs[0].id);
            cust.state = JSON.parse(cust.state.toString());
            this.afs
              .collection('customers')
              .doc(snap.docs[0].id)
              .update(cust)
              .then(resp => {
                resolve(true);
              })
              .catch(err => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }
  removeCustomer(cust: CustomerModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afs.collection('customers', ref => ref.where('ident', '==', cust.ident))
          .get()
          .subscribe(snap => {
            console.log('id', snap.docs[0].id);
            this.afs
              .collection('customers')
              .doc(snap.docs[0].id)
              .update({
                name: cust.name,
                brand: cust.brand,
                identType: cust.identType,
                ident: cust.ident,
                contact: cust.contact,
                email: cust.email,
                address: cust.address,
                phone: cust.phone,
                state: false
              })
              .then(resp => {
                console.log('deleted cust resp', resp);
                resolve(true);
              })
              .catch(err => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }
  // endregion

  // #region Locations
  getLocations(cust): any {
    return this.afs.collection('customers', ref => ref.where('ident', '==', cust.ident))
      .get()
      .subscribe(snap => {
        this.currentCustID = snap.docs[0].id;
        return this.afs
          .collection('customers')
          .doc(snap.docs[0].id)
          .collection('locations')
          .valueChanges();
      });
  }

  getLocationByKey(locKey: string): Promise<any> {
    return new Promise(resolve => {
      this.afs.collection('customers').get().subscribe(snap => {
        snap.docs.forEach(cust => {
          cust.ref
            .collection('locations')
            .where('key', '==', locKey)
            .get()
            .then(loc => {
              if (loc.docs.length > 0) {
                resolve(loc.docs[0].data());
              }
            });
        });
      });
    });
  }

  newLocation(loc: LocationModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afs
          .collection('customers')
          .doc(this.currentCustID)
          .collection('locations')
          .add(loc)
          .then(resp => {
            console.log('new loc resp srvc', resp.id);
            this.afs
              .collection('customers')
              .doc(this.currentCustID)
              .collection('locations')
              .doc(resp.id)
              .update({ key: resp.id });
            resolve(true);
          })
          .catch(err => {
            this.presentToast(err.message).then(() => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }
  editLocation(loc: LocationModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        loc.state = JSON.parse(loc.state.toString());
        this.afs
          .collection('customers')
          .doc(this.currentCustID)
          .collection('locations')
          .doc(loc.key)
          .update(loc)
          .then(resp => {
            resolve(true);
          })
          .catch(err => {
            this.presentToast(err.message).then(() => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }
  removeLocation(loc: LocationModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        loc.state = JSON.parse(loc.state.toString());
        this.afs
          .collection('customers')
          .doc(this.currentCustID)
          .collection('locations')
          .doc(loc.key)
          .update({ state: false })
          .then(resp => {
            resolve(true);
          })
          .catch(err => {
            this.presentToast(err.message).then(() => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }

  getLocationReports(locId: string): Observable<any> {
    return this.afs
      .collection('dailyreport', ref =>
        ref.where('locationId', '==', locId).where('state', '==', 'created').orderBy('creationDate', 'desc')
      )
      .valueChanges();
  }
  //endregion

  //#region Planes
  getPlanes(loc: LocationModel): Observable<any> {
    return this.afs
      .collection('customers')
      .doc(this.currentCustID)
      .collection('locations')
      .doc(loc.key)
      .collection('planes')
      .valueChanges();
  }

  newPlane(plane: any, lockey: string, planeObj?: any) {
    return new Promise(resolve => {
      try {
        if (!planeObj) {
          const ref = this.afs
            .collection('customers')
            .doc(this.currentCustID)
            .collection('locations')
            .doc(lockey)
            .collection('planes');
          ref
            .add(plane)
            .then(resp => {
              ref
                .doc(resp.id)
                .update({ key: resp.id })
                .then(() => {
                  resolve(true);
                })
                .catch(err => {
                  this.presentToast(err.message).then(() => resolve(false));
                });
            })
            .catch(err => {
              this.presentToast(err.message).then(() => resolve(false));
            });
        }

        const planeStorageRef = this.afStorage.ref('planes/' + plane.name);
        planeStorageRef
          .put(planeObj)
          .then((snap: any) => {
            console.log('plano subido url', snap.downloadURL);
            plane.url = snap.downloadURL;
            const ref = this.afs
              .collection('customers')
              .doc(this.currentCustID)
              .collection('locations')
              .doc(lockey)
              .collection('planes');
            ref
              .add(plane)
              .then(resp => {
                ref
                  .doc(resp.id)
                  .update({ key: resp.id })
                  .then(() => {
                    resolve(true);
                  })
                  .catch(err => {
                    this.presentToast(err.message).then(() => resolve(false));
                  });
              })
              .catch(err => {
                this.presentToast(err.message).then(() => resolve(false));
              });
          })
          .catch(err => {
            this.presentToast(err.message).then(() => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }
  editPlane(obj: any, lockey: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afs
          .collection('customers')
          .doc(this.currentCustID)
          .collection('locations')
          .doc(lockey)
          .collection('planes')
          .doc(obj.key)
          .update(obj)
          .then(resp => {
            resolve(true);
          })
          .catch(err => {
            this.presentToast(err.message).then(() => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }
  removePlane(obj: any, lockey: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afs
          .collection('customers')
          .doc(this.currentCustID)
          .collection('locations')
          .doc(lockey)
          .collection('planes')
          .doc(obj.key)
          .update({ state: false })
          .then(resp => {
            resolve(true);
          })
          .catch(err => {
            this.presentToast(err.message).then(() => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }
  // end region

  //#region material
  newMaterial(mat): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afs
          .collection('materials')
          .add(mat)
          .then(resp => {
            console.log('new resp srvc', resp);
            resolve(true);
          })
          .catch(err => reject(false));
      } catch (error) {
        reject(false);
      }
    });
  }

  editMaterial(mat): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afs.collection('materials', ref => ref.where('name', '==', mat.name))
          .get()
          .subscribe(snap => {
            console.log('id', snap.docs[0].id);
            this.afs
              .collection('materials')
              .doc(snap.docs[0].id)
              .update(mat)
              .then(resp => {
                console.log('edited resp', resp);
                resolve(true);
              })
              .catch(err => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }

  removeMaterial(name): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.afs.collection('materials', ref => ref.where('name', '==', name))
          .get()
          .subscribe(snap => {
            console.log('id', snap.docs[0].id);
            this.afs
              .collection('materials')
              .doc(snap.docs[0].id)
              .delete()
              .then(resp => {
                console.log('deleted resp', resp);
                resolve(true);
              })
              .catch(err => resolve(false));
          });
      } catch (error) {
        resolve(false);
      }
    });
  }
  //endregion

  presentToast(message: string): Promise<void> {
    return new Promise(resolve => {
      if (message.includes('is already in use')) {
        this.errorMsg =
          'Dirección de correo ya utilizada, por favor intente con una diferente!';
      } else if (
        message.includes('First argument \'email\' must be a valid string')
      ) {
        this.errorMsg = 'El Correo ingresado no es válido!';
      } else if (message.includes('is badly formatted')) {
        this.errorMsg = 'El Correo no tiene un formato válido!';
      } else {
        this.errorMsg = message;
      }
      const toast = this.toastCtrl.create({
        message: this.errorMsg,
        duration: 5000,
        position: 'bottom'
      }).then(toas => toast.present);

      toast.onDidDismiss(() => {
        resolve();
      });
    });
  }
}
