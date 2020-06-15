import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseserviceService {

  constructor(public db:AngularFirestore) { }

  readUsers() {
    return this.db.collection('users').snapshotChanges();
  }
  readverifierUsers() {
    return this.db.collection('users').snapshotChanges();
  }
  readAdhar() {
    return this.db.collection('adharfiles').snapshotChanges();
  }
}
