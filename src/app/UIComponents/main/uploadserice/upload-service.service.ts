import { Injectable } from '@angular/core';
import {Upload} from './upload';
import { AngularFireDatabase } from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {
  FirebaseListObservable,
  FirebaseObjectObservable,
} from '@angular/fire/database-deprecated';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class UploadServiceService {
  constructor(private db: AngularFireDatabase) { }

  pushUpload(upload: Upload) {
    let storageref = firebase.storage().ref();
    // tslint:disable-next-line: prefer-const
    let uploadTask = storageref
      .child(`uploads/${upload.file.name}`)
      .put(upload.file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
      },
      (error) => {
        console.log(error);
      },
      () => {
        // upload sucess
        // tslint:disable-next-line: deprecation
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        console.log(upload.name);
         this.saveFileData(upload);
      }
    );
  }

  private saveFileData(upload: Upload) {
    this.db.list(`uploads/`).push(upload);
  }
}
