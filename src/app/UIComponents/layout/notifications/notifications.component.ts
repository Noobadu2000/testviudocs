import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataserviceService } from '../../../dataservice.service';
import { FirebaseserviceService } from '../../../firebaseservice.service';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Email } from '../../../../assets/Js/smtp';
import * as _ from 'underscore';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {

  notificationsForm: FormGroup;
  Users: any = [];
  requsers: any;
  loggedInUser: String;
  constructor(private formbuilder: FormBuilder,
    private db: AngularFirestore,
    private fbs: FirebaseserviceService,
    private http: Http) { }

  ngOnInit(): void {
    this.notificationsForm = this.formbuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });
    this.loggedInUser = localStorage.getItem('email');
    this.getRequestVerifier();

  }

  // onSubmit() {
  //   const notificationsData = {
  //     email: this.notificationsForm.controls.email.value,
  //   };
  //   for (let i = 0; i < this.Users.length; i++) {
  //     if (this.Users[i].id !== 'requsers') {
  //       console.log("reached1")
  //       if (this.Users[i].Name.verifier === notificationsData.email) {
  //         console.log("reached");
  //         this.db.collection("requsers")[i].set({ access: true });
  //         //this.Users[i].Name.set({access:'true'});

  //         //  this.db
  //         //.collection("requsers")
  //         //.doc(data.payload.doc.id)
  //         //.set({ access: true });

  //       }
  //     }
  //     else {
  //       window.alert("Request not found");
  //     }
  //   }
  // }

  Response = (response: Number, collecId: string) => {
    this.db.collection("requsers").doc(collecId).set({
      "requestUser": {
        "access":response
      }
    }, {merge:true});
    this.getRequestVerifier();
  }

  getRequestVerifier = () => {
    this.fbs.requestVerfier().subscribe(data => {
      this.Users = [];
      data.map(e => {
        if (!_.isUndefined(e.payload.doc.data()['requestUser']) && e.payload.doc.data()['requestUser'].access == 0
          && e.payload.doc.data()['requestUser'].user === this.loggedInUser) {
          this.Users.push({
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()['requestUser'].verifier,
          });
        }
      });
    });
  }
}

