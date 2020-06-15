import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FirebaseserviceService } from '../../firebaseservice.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { DataserviceService } from "../../dataservice.service";
import { Router } from "@angular/router";
// import { EventEmitter } from "events";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  loginInvalid: false;
  loginusers: [];
  Users: any;
  NewEmail;
  NewName;
  //validuser = false;
  //@Output ValidUser : EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-inferrable-types
  validuser: boolean = true;
  constructor(
    private formbuilder: FormBuilder,
    private datasvc: DataserviceService,
    private router: Router,
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private fbs: FirebaseserviceService
  ) {
  }
  getloginurl = "../../../assets/samplejson/login.json";
  ngOnInit(): void {
    this.loginform = this.formbuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.required],
    });
    this.fbs.readUsers().subscribe(data => {
      this.Users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['signupData'],
        };
    });
  });
  }
  onSubmit() {
    const loginData = {
      username: this.loginform.controls.username.value,
      password: this.loginform.controls.password.value,
    };
    this.datasvc.signin(loginData.username, loginData.password);
    console.log(this.Users);
      for (let i = 0; i < this.Users.length; i++) {
        if (this.Users[i].id !== 'users') {
          if (this.Users[i].Name.username === loginData.username && this.Users[i].Name.password === loginData.password) {
           this.NewEmail = this.Users[i].Name.username;
           this.NewName = this.Users[i].Name.firstname;
           console.log(this.NewEmail);
           console.log(this.NewName);
           this.datasvc.registerdetails(this.NewEmail,this.NewName);
          }
        }
      }
    }
}
