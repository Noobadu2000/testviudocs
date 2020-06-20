import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FirebaseserviceService } from '../../../firebaseservice.service';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Email } from '../../../../assets/Js/smtp';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { DataserviceService } from 'src/app/dataservice.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from 'underscore';
// declare let Email: any;
@Component({
  selector: 'app-search-emplyee',
  templateUrl: './search-emplyee.component.html',
  styleUrls: ['./search-emplyee.component.css']
})
export class SearchEmplyeeComponent implements OnInit {

  pdfSrc: any;
  searchForm: FormGroup;
  Users: any;
  adhars: any;
  pans:any;
  isShowFile: Boolean =false;
  loggedInUser: string = sessionStorage.getItem('email');
  verifiedUsers:any = [];
  searchedUser:any = [];
  constructor(private formbuilder: FormBuilder,
    private fbs: FirebaseserviceService,
    private datasvc: DataserviceService,
    private db: AngularFirestore,
    private sanitizer: DomSanitizer,
    private fbService: FirebaseserviceService) { }

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
    this.getRequestVerifier();
    this.fbs.getDoc("adharfiles").subscribe(data => {
      console.log("coming here");
      this.adhars = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data(),
        };
      });
      // console.log(this.adhars[0].Name.downloadURL);
    });

    this.fbs.getDoc("panfiles").subscribe(data => {
      this.pans = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data(),
        };
      });
    });
  }
  onSubmit() {
    if (this.searchForm.valid) {
      // this.searchedUser = [];
      this.searchedUser = []
      const SearchData = {
        email: this.searchForm.controls.email.value.trim(),
      };
      const isUserInList = _.find(this.Users, (ele: any) => { return ele.Name.username == SearchData.email; })
      if (isUserInList) {
        const isUserInVerification = _.find(this.verifiedUsers, (ele:any) =>   {return ele.Name == SearchData.email});
        if (isUserInVerification && isUserInVerification.acess === 0) {
          alert('waiting for the user approval')
        } else if (isUserInVerification && isUserInVerification.acess === 1) {
          const adhar = _.find(this.adhars, (ele:any) =>   {return ele.Name.user == SearchData.email})
          const pans = _.find(this.pans, (ele:any) =>   {return ele.Name.user == SearchData.email})
          this.searchedUser.push({name: SearchData.email, adharFile: adhar? adhar.Name.downloadURL: [], panFile: pans? pans.Name.downloadURL: []}) ;
          console.log(this.searchedUser);
        } else if (isUserInVerification && isUserInVerification.acess === 2) {
          alert('user rejected');
        }
        // this.fbService.getUsersById(SearchData.email, isUserInList.id)
        //   .subscribe((data: any) => {
        //     console.log(data)
        //   });
        return;
      }
      // this.datasvc.signup(signupData.username, signupData.password);

      for (let i = 0; i < this.Users.length; i++) {
        if (this.Users[i].id !== 'users') {
          if (this.Users[i].Name.username === SearchData.email) {
            const requestUser = {
              access: false,
              user: SearchData.email,
              verifier: sessionStorage.getItem('email')
            };
            this.db.collection('requsers').add({ requestUser });
            Email.send({
              Host: 'smtp.elasticemail.com',
              Username: 'techviudocs@gmail.com',
              Password: 'E72351E1C0B3BCED402711D7A5F1C4DE14DC',
              To: SearchData.email,
              From: `techviudocs@gmail.com`,
              Subject: 'Greetings from ViuDocs',
              Body: `
              <i>Hi ! Welcome to viuDocs</i> `
            }).then(message => {
              alert('Confirmation mail is send to user! Please wait User to confirm');
              this.searchForm.reset();
            });

            this.pdfSrc = "";

          }
          //  else if(this.Users[i].Name.username !== SearchData.email) {
          //   window.alert('Please give valid email of user!!');
          //   break;
          // }
        }
      }
    }

  }
  getRequestVerifier = () => {
    this.fbs.requestVerfier().subscribe(data => {
      this.verifiedUsers = [];
      data.map(e => {
        if (!_.isUndefined(e.payload.doc.data()['requestUser'])
          && e.payload.doc.data()['requestUser'].verifier === this.loggedInUser) {
          this.verifiedUsers.push({
            id: e.payload.doc.id,
            Name: e.payload.doc.data()['requestUser'].user,
            acess: e.payload.doc.data()['requestUser'].access
          });
        }
      });
    });
  }
  showFile = () => {
    this.isShowFile = !this.isShowFile;
  }
  getByPassImg = (img:any) => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(img[0].adharFile);
   }
}
