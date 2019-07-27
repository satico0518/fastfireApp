import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class PlaneService {
  private custRef = this.afs.collection('customers');

  constructor(private afs: AngularFirestore) {}

  getPlanesByLocation(custId, locId) {
    const planeRef = this.custRef
      .doc(custId)
      .collection('locations')
      .doc(locId)
      .collection('planes');
    const planes = [];
    return new Promise((resolve) => {
      planeRef
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach((doc: any) => {
            planes.push({ id: doc.id, data: doc.data() });
          });
          resolve(planes);
        }, error => {
          console.error('Error getting planes: ', error);
        });
    });
  }
}
