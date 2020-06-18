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
  requests: any;
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
          Name: e.payload.doc.data(),
        };
      });
    });

    this.fbs.readUsers().subscribe(data => {
      console.log("coming here");
      this.requests = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data(),
        };
      });
      console.log(this.requests[0].Name.verifier);
    });
  }
  onSubmit() {
    const notificationsData = {
  email: this.notificationsForm.controls.email.value,
    };

    //this.datasvc.verfiersignin(loginData.username, loginData.password);
    
    for (let i = 0; i < this.Users.length; i++) {
      if (this.Users[i].id !== 'requsers') {
        if (this.Users[i].Name.verifier === notificationsData.email) {
          this.db.collection('requsers')[i].access= true;
          
          //this.datasvc.registerdetails(this.NewEmail, this.NewName);

        }
      }
    }
  }
}
