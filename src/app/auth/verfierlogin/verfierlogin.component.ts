import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../../dataservice.service';
import { FirebaseserviceService } from '../../firebaseservice.service';
import { AngularFirestore ,AngularFirestoreModule} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-verfierlogin',
  templateUrl: './verfierlogin.component.html',
  styleUrls: ['./verfierlogin.component.css']
})
export class VerfierloginComponent implements OnInit {
  loginform: FormGroup;
  loginInvalid: false;
  Users;
  NewEmail;
  NewName;
  retUrl;
  constructor(private formbuilder: FormBuilder, private datasvc: DataserviceService,
    private fbs: FirebaseserviceService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(data =>
      this.retUrl = decodeURIComponent(data['retUrl']));
    if (this.retUrl === 'undefined') {
      this.retUrl = '/';
    }
  }

  ngOnInit(): void {
    this.loginform = this.formbuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
    //   this.fbs.readverifierUsers().subscribe(data => {
    //     this.Users = data.map(e => {
    //       return {
    //         id: e.payload.doc.id,
    //         isEdit: false,
    //         Name: e.payload.doc.data()['signupData'],
    //       };
    //     });
    //   });
  }
  onSubmit() {
    const loginData = {
      username: this.loginform.controls.username.value,
      password: this.loginform.controls.password.value,
    };
    // this.datasvc.verfiersignin(loginData.username, loginData.password);
    this.datasvc.verfiersignin(loginData.username, loginData.password, (res: any) => {
      if (!res.error) {
        this.datasvc.registerdetails(res.response.user.email, res.response.user.displayName ? res.response.user.displayName : res.response.user.email);
        // this.router.navigate(["/"]);
        localStorage.setItem('viuDocUserEmail', JSON.stringify(res.response.user.email));
        localStorage.setItem('viuDocUsername', res.response.user.displayName);
        localStorage.setItem('verifyUser', 'true');
        window.location.href = this.retUrl;
      } else {
        window.alert(res.message);
      }
    });
    //   console.log(this.datasvc.verfiersignin(loginData.username, loginData.password));
    //   for (let i = 0; i < this.Users.length; i++) {
    //     if (this.Users[i].id !== 'users') {
    //       if (this.Users[i].Name.username === loginData.username && this.Users[i].Name.password === loginData.password) {
    //         this.NewEmail = this.Users[i].Name.username;
    //         this.NewName = this.Users[i].Name.firstname;
    //         console.log(this.NewEmail);
    //         sessionStorage.setItem('email', this.NewEmail);
    //         console.log(this.NewName);
    //         this.datasvc.registerdetails(this.NewEmail, this.NewName);
    //       }
    //     }
    // }
  }
}
