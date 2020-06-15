import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: "app-upload-adhar",
  templateUrl: "./upload-adhar.component.html",
  styleUrls: ["./upload-adhar.component.scss"],
})
export class UploadAdharComponent implements OnInit {
 constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
  }
  // tslint:disable-next-line: no-inferrable-types
  adhardoc: boolean = true;
  ngOnInit(): void {}

  // tslint:disable-next-line: member-ordering
  isHovering: boolean;

  // tslint:disable-next-line: member-ordering
  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(file: FileList) {
    console.log(file);
    for (let i = 0; i < file.length; i++) {
      this.files.push(file.item(i));
    }
  }
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
}
}
