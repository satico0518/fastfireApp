import { Injectable } from '@angular/core';
import { CustomerModel } from '../models/customer.model';
import { LocationModel } from '../models/location.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class ProcessService {

    private matRef = this.afs.collection('materials');
    private inspRef = this.afs.collection('inspections');
    private testRef = this.afs.collection('sitestest');
    private dailyreportRef = this.afs.collection('dailyreport');
    private locations: Array<any>;
    currentCust = {} as { id: string, name: string, brand: string, icon: string };
    currentUser = {} as { id: string, name: string, brand: string, icon: string };
    currentLoc = {} as { id: string, name: string, address: string };
    currentUserLocsAssigned: any[];
    constructor(protected afs: AngularFirestore, private afStorage: AngularFireStorage) {
    }

    getCustomers(): Promise<CustomerModel[]> {
        return new Promise((resolve) => {
            const customers = [];
            this.afs.collection('users', ref => ref.where('state', '==', true)).get()
                .subscribe((querySnapshot) => {
                    querySnapshot.forEach((doc: any) => {
                        customers.push({ id: doc.id, data: doc.data() });
                    });
                    resolve(customers);
                },
                (error) => {
                    console.error('Error getting customers: ', error);
                });
        });
    }

    getAssignedCustomers(userId: string) {
        return new Promise((resolve) => {
            const customers = [];
            this.currentUserLocsAssigned = [];
            this.afs.collection('users', ref => ref.where('id', '==', userId)).get().subscribe(user => {
                user.docs[0].ref.collection('assignedLocs').get().then(locs => {
                    locs.forEach(loc => {
                        this.afs.collection('customers', ref => ref.where('state', '==', true)).get()
                            .subscribe((querySnapshot) => {
                                querySnapshot.forEach(cust => {
                                    cust.ref.collection('locations').where('key', '==', loc.data().loc).get().then(custLoc => {
                                        if (!custLoc.empty) {
                                            customers.push({ id: cust.id, data: cust.data() });
                                            this.currentUserLocsAssigned.push({ custId: cust.id, data: custLoc.docs[0].data() });
                                        }
                                    });
                                });
                            }, (error) => {
                                console.error('Error getting customers: ', error);
                            });
                    });
                    resolve(customers);
                });
            });
        });
    }

    getLocations(custId: string): Promise<LocationModel[]> {
        return new Promise((resolve) => {
            this.locations = [];
            this.afs.collection('customers').doc(custId).collection('locations').get()
                .subscribe((querySnapshot) => {
                    querySnapshot.forEach((doc: any) => {
                        this.locations.push({ id: doc.id, data: doc.data() });
                    });
                    resolve(this.locations);
                }, (error) => {
                    console.error('Error getting locations: ', error);
                });
        });
    }

    getAssignedLocs(custId: string): Promise<LocationModel[]> {
        return new Promise((resolve) => {
            const locs = [];
            this.currentUserLocsAssigned.forEach(loc => {
                if (loc.custId === custId) {
                    locs.push({ id: loc.data.key, data: loc.data });
                }
            });
            resolve(locs);
        });
    }

    getMaterials(): Promise<Observable<any[]>> {
        return new Promise((resolve) => {
            resolve(this.matRef.valueChanges());
        });
    }

    saveInspect(insp: any) {
        return new Promise((resolve) => {
            // this.storeImages(insp.images, insp.locationId).then(pics => {
            //     const body = {
            //         customerId: insp.customerId,
            //         customer: insp.customer,
            //         locationId: insp.locationId,
            //         location: insp.location,
            //         images: pics,
            //         order: insp.order,
            //         memo: insp.memo,
            //         user: insp.user,
            //         creationDate: new Date(),
            //         state: 'created'
            //     };
            //     this.inspRef.add(body).then(docRef => {
            //         resolve(docRef);
            //     }).catch((error) => {
            //         console.error('Error setting inspect: ', error);
            //     });
            // });
            const body = {
                customerId: insp.customerId,
                customer: insp.customer,
                locationId: insp.locationId,
                location: insp.location,
                images: insp.images,
                order: insp.order,
                memo: insp.memo,
                user: insp.user,
                creationDate: new Date(),
                state: 'created'
            };
            this.inspRef.add(body).then(docRef => {
                resolve(docRef);
            }).catch((error) => {
                console.error('Error setting inspect: ', error);
            });
        });
    }

    storeImages(images: string[], locationId: string): Promise<string[]> {
        return new Promise((resolve) => {
            const picsUrl = [];
            for (let index = 0; index < images.length; index++) {
                const element = images[index];
                this.afStorage.ref('inspections/loc-' + locationId + '/' + new Date())
                .putString(element, 'data_url').then(snap => {
                    snap.task.then((task: any) => {
                        picsUrl.push(task.downloadURL);
                        console.log(task.downloadURL);
                        if (index === images.length - 1) {
                            resolve(picsUrl);
                        }
                    });
                });
            }
        });
    }

    saveSiteTest(test: any) {
        return new Promise((resolve) => {
            this.testRef.add(test).then(docRef => {
                resolve(docRef);
            }).catch((error) => {
                console.error('Error setting SaveSiteTest: ', error);
            });
        });
    }

    saveDailyReport(report: any) {
        return new Promise((resolve) => {
            let index = 0;
            report.photos.forEach(pic => {
                this.afStorage.ref('dailyReportPics/loc-' + report.locationId + '/' + new Date())
                .putString(pic, 'data_url')
                .then((snap: any) => {
                    report.photos[index] = snap.downloadURL;
                    index++;
                });
            });
            this.dailyreportRef.add(report).then(docRef => {
                resolve(docRef);
            }).catch((error) => {
                resolve(null);
                alert(JSON.stringify(error));
                console.error('Error setting SaveDailyReport: ', error);
            });
        });
    }
}
