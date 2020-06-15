import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Http, Headers } from "@angular/http";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class DataserviceService {
  userData;
  email = new Subject<string>();
  firstname;
  lastname;
  Data;
  VerfierData = [];
  validuser = new Subject<string>();
  verifierUser = new Subject<string>();
  constructor(
    private http: Http,
    private angfireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.userData = angfireAuth.authState;
  }
  getData(url): Observable<any> {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Access-Control-Allow-methods",
      "POST,GET,OPTIONS,PUT,DELETE"
    );
    headers.append("Access-Control-Allow-origin", "*");
    return this.http.get(url).pipe(map((response: any) => response.json()));
  }

  signin(email, password) {
    this.angfireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.router.navigate(["/"]);
        this.postloginData(true);
      });
  }
  verfiersignin(email, password) {
    this.angfireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.router.navigate(["/"]);
        this.postverifierlogin(true);
      });
  }
  signup(email, password) {
    this.angfireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.router.navigate(["/user_login"]);
        window.alert("You have been successfully registered to ViuDocs");
      });
  }
  postverifierlogin(login) {
    this.verifierUser.next(login);
  }
  postloginData(login) {
    this.validuser.next(login);
  }
  getverfierLoginData(): Observable<any> {
    return this.verifierUser.asObservable();
  }
  // tslint:disable-next-line: whitespace
  getLoginData(): Observable<any> {
    return this.validuser.asObservable();
  }
  registerdetails(email, firstname) {
    this.Data = {
      email,
      firstname
    };

    console.log(this.email);
  }
  getdetails() {
    return this.Data;
  }
}
