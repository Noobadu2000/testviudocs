import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataserviceService } from '../../../dataservice.service';
import { FirebaseserviceService } from '../../../firebaseservice.service';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import {Email} from '../../../../assets/Js/smtp';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

 export class NotificationsComponent implements OnInit {

  notificationsForm: FormGroup;
  Users: any;
  requsers: any;
  constructor( private formbuilder: FormBuilder,private db: AngularFirestore, private fbs: FirebaseserviceService, private http: Http) { }

  ngOnInit(): void {
    this.notificationsForm = this.formbuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });
    this.fbs.readUsers().subscribe(data => {
      this.Users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['requestData'],
        };
      });
    });  
  }

  onSubmit() {
    const notificationsData = {
  email: this.notificationsForm.controls.email.value,
    };
    for (let i = 0; i < this.Users.length; i++) {
      if (this.Users[i].id !== 'requsers') {
        console.log("reached1")
        if (this.Users[i].Name.verifier === notificationsData.email ) {
          console.log("reached");
          this.db.collection("requsers")[i].set({access:true});
          //this.Users[i].Name.set({access:'true'});

      //  this.db
       //.collection("requsers")
       //.doc(data.payload.doc.id)
       //.set({ access: true });
          
        }
      }
      else{
      window.alert("Request not found");
      }
    }
  }

  onClick() {
    window.alert("working");
      }
}

