import { AuthGuardService } from './auth-guard.service';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ContactusComponent } from './UIComponents/layout/contactus/contactus.component';
import { NotificationsComponent } from './UIComponents/layout/notifications/notifications.component';
import { SearchEmplyeeComponent } from './UIComponents/main/search-emplyee/search-emplyee.component';
import { AboutusComponent } from './UIComponents/layout/aboutus/aboutus.component';
import { DashboardComponent } from './UIComponents/layout/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { UploaddocumentsComponent } from './UIComponents/main/uploaddocuments/uploaddocuments.component';
import { TeamComponent } from './UIComponents/team/team.component';

export const AppRoutes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ],
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  { path: 'contactus', component: ContactusComponent },
  {
    path: 'upload_docs', component: UploaddocumentsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'search-employee', component: SearchEmplyeeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'notifications', component: NotificationsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'team',
    loadChildren: () => import('./UIComponents/team/team.module').then(team => team.TeamModule)
  }

];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
