import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FirebaseserviceService } from '../../../firebaseservice.service';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import {Email} from '../../../../assets/Js/smtp';
// declare let Email: any;
@Component({
  selector: 'app-search-emplyee',
  templateUrl: './search-emplyee.component.html',
  styleUrls: ['./search-emplyee.component.css']
})
export class SearchEmplyeeComponent implements OnInit {

  searchForm: FormGroup;
  Users: any;
  adhars: any;
  constructor( private formbuilder: FormBuilder, private fbs: FirebaseserviceService, private http: Http) { }

  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      email: ['', Validators.compose([Validators.required])]
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

    this.fbs.readAdhar().subscribe(data => {
      console.log("coming here");
      this.adhars = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data(),
        };
      });
      console.log(this.adhars[0].Name.downloadURL);
    });
  }
  onSubmit() {
    const SearchData = {
      email: this.searchForm.controls.email.value,
    };
    for (let i = 0; i < this.Users.length; i++) {
      if (this.Users[i].id !== 'users') {
        if (this.Users[i].Name.username === SearchData.email) {
          console.log("coming here");
          Email.send({
            Host: 'smtp.elasticemail.com',
            Username: 'techviudocs@gmail.com',
            Password: 'E72351E1C0B3BCED402711D7A5F1C4DE14DC',
            To: SearchData.email,
            From: `techviudocs@gmail.com`,
            Subject: 'Greetings from ViuDocs',
            Body: `
            <i>Hi ! Welcome to viuDocs</i> `
          }).then(message => { alert('Confirmation mail is send to user! Please wait User to confirm');
          this.searchForm.reset();
        });
        }
        //  else if(this.Users[i].Name.username !== SearchData.email) {
        //   window.alert('Please give valid email of user!!');
        //   break;
        // }
      }
    }
  }
}
