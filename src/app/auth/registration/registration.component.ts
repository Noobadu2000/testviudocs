import { Component, OnInit } from '@angular/core';
import { AngularFirestore ,AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataserviceService } from "../../dataservice.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loginInvalid = false;

  regform: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private datasvc: DataserviceService,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.regform = this.formbuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      phonenumber: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      cnfpassword: ['', Validators.required],
    });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // return null if controls haven't initialised yet
      if (!control || !matchingControl) {
        return null;
      }

      // return null if another validator has already found an error on the matchingControl
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  regSubmit() {
    const signupData = {
      username: this.regform.controls.username.value,
      password: this.regform.controls.password.value,
      firstname: this.regform.controls.firstname.value,
      lastname: this.regform.controls.lastname.value,
    };
    if (this.regform.valid) {
      this.datasvc.signup(signupData.username, signupData.password, signupData.firstname, signupData.lastname, (res: any) => {
        if (!res.error) {
          this.db.collection('users').add({ signupData });
          window.alert(res.message);
          this.router.navigate(["auth/user_login"]);
        } else {
          window.alert(res.message);
        }
      });
    } else {
      Object.keys(this.regform.controls).forEach(field => {
        const control = this.regform.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
}
