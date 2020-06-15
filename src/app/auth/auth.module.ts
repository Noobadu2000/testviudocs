import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { VerfierloginComponent } from './verfierlogin/verfierlogin.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RegistrationComponent } from './registration/registration.component';
const routes: Routes = [
  {path: '/login', component: LoginComponent}
];
@NgModule({
  declarations: [LoginComponent, VerfierloginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports : [
    LoginComponent
  ]
})
export class AuthModule { }
