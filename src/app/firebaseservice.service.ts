import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FirebaseserviceService {

  constructor(public db:AngularFirestore) { }

  readUsers() {
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.db.collection('users').snapshotChanges();
  }
  readverifierUsers() {
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.db.collection('users').snapshotChanges();
  }
  readAdhar() {
    return this.db.collection('adharfiles').snapshotChanges();
  }

  requestVerfier = () => {
    const headers = new HttpHeaders()
    return this.db.collection('requsers').snapshotChanges();
  }
}
