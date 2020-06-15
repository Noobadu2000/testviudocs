import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { environment} from './../environments/environment';
import {MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION} from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './UIComponents/layout/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './UIComponents/layout/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { VerfierloginComponent } from './auth/verfierlogin/verfierlogin.component';
import { AboutusComponent } from './UIComponents/layout/aboutus/aboutus.component';
import { ContactusComponent } from './UIComponents/layout/contactus/contactus.component';
import { HttpModule } from '@angular/http';
import { MaindashboardComponent } from './UIComponents/main/maindashboard/maindashboard.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import {MatCardModule} from '@angular/material/card';
import { UploaddocumentsComponent } from './UIComponents/main/uploaddocuments/uploaddocuments.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {DataserviceService} from './dataservice.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {UploadAdharComponent} from '../app/UIComponents/main/upload-adhar/upload-adhar.component';
import { UploadTaskComponent } from './UIComponents/main/upload-task/upload-task.component';
import {UploaddirectiveDirective} from '../app/UIComponents/main/directive/uploaddirective.directive';
import { UploadPanComponent } from './UIComponents/main/upload-pan/upload-pan.component';
import { UploadInterComponent } from './UIComponents/main/upload-inter/upload-inter.component';
import { UploadtenthComponent } from './UIComponents/main/uploadtenth/uploadtenth.component';
import { SearchEmplyeeComponent } from './UIComponents/main/search-emplyee/search-emplyee.component';
const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'user_login', component: LoginComponent},
  {path: 'verfier_login', component: VerfierloginComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'contactus', component: ContactusComponent},
  {path: 'Registration', component: RegistrationComponent},
  {path : 'upload_docs', component: UploaddocumentsComponent},
  {path: 'search-employee', component: SearchEmplyeeComponent}
];
var firebaseConfig = {
  apiKey: "AIzaSyCKH4amiPzdEJywtxI1xoOoT82dJ2gAdgk",
  authDomain: "viudocs-c877f.firebaseapp.com",
  databaseURL: "https://viudocs-c877f.firebaseio.com",
  projectId: "viudocs-c877f",
  storageBucket: "viudocs-c877f.appspot.com",
  messagingSenderId: "907155785554",
  appId: "1:907155785554:web:ad3a7bfd2f07ba1a7cdc8b",
  measurementId: "G-JZ9SPYLFF8"
};

@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    ContactusComponent,
    MaindashboardComponent,
    UploaddocumentsComponent,
    UploadAdharComponent,
    UploadTaskComponent,
    UploaddirectiveDirective,
    UploadPanComponent,
    UploadInterComponent,
    UploadtenthComponent,
    SearchEmplyeeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    MatSidenavModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    HttpModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
     RouterModule.forChild(routes)
  ],

  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'},
    DataserviceService,
    AngularFireStorage,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
