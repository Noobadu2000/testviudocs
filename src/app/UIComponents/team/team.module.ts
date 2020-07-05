import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { RouterModule } from '@angular/router';
import { teamRoutes } from './team.routing';



@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(teamRoutes)
  ]
})
export class TeamModule { }
