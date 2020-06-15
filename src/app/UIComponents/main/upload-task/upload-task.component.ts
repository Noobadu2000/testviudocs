import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {DataserviceService} from '../../../dataservice.service';
@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  @Input() adhardoc;
  @Input() pandoc;
  @Input() interdoc;
  @Input() tenthdoc;
  email;
  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  name: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private Datasvc: DataserviceService) { }

  ngOnInit() {
    this.startUpload();
    this.email = this.Datasvc.getdetails().email;
  }

  startUpload() {
    this.name = this.file.name;
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        console.log(this.file);
        console.log("adhar doc" + this.adhardoc + "pandoc " + this.pandoc);
        this.downloadURL = await ref.getDownloadURL().toPromise();

        if (this.adhardoc === true && this.file.type === "application/pdf") {
          this.db.collection('adharfiles').add({ downloadURL: this.downloadURL, path , user: this.email  });

        } else if (this.pandoc === true) {
          this.db.collection('panfiles').add({ downloadURL: this.downloadURL, path , user: this.email});
        } else if(this.interdoc === true) {
          this.db.collection('interfiles').add({ downloadURL: this.downloadURL, path , user: this.email });
        } else if(this.tenthdoc === true) {
          this.db.collection('tenthdoc').add({ downloadURL: this.downloadURL, path , user: this.email });
        }
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
