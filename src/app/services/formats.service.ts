import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FormatsService {

    constructor(private afs: AngularFirestore) {}
    formatRef = this.afs.collection('formats');
    nsrRef = this.afs.collection('nsr');

    getFormats() {
        return new Promise((resolve, reject) => {
            const formats = [];
            this.formatRef.get()
                .subscribe((querySnapshot) => {
                    querySnapshot.forEach((doc: any) => {
                        formats.push(doc.data());
                    });
                    resolve(formats);
                },
                (error) => {
                    console.error('Error getting formats: ', error);
                });
        });
    }

    getNsrs() {
        return new Promise((resolve, reject) => {
            const nsrs = [];
            this.nsrRef.get()
                .subscribe((querySnapshot) => {
                    querySnapshot.forEach((doc: any) => {
                        nsrs.push(doc.data());
                    });
                    resolve(nsrs);
                }, (error) => {
                    console.error('Error getting nsrs: ', error);
                });
        });
    }
}
