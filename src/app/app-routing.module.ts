import { environment } from '../environments/environment';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeeResolver } from './resolvers';
// import { ProjectResolver } from './resolvers';
// import { TaskResolver } from './resolvers';
import { SocketComponent } from './socket/socket.component';
import * as fromEmployees from './employees';
import * as fromDashboard from './dashboard';
import * as fromSiteInfo from './site-info';
import * as fromProjects from './projects';
import * as fromDevTeam from './dev-team';
import * as fromTasks from './tasks';
import * as fromHome from './home';

const enableTracing = false && !environment.production;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: fromHome.HomeComponent,
  },
  {
    path: 'socket',
    component: SocketComponent,
  },
  {
    path: 'devTeam',
    component: fromDevTeam.DevTeamComponent,
  },
  {
    path: 'information',
    component: fromSiteInfo.SiteInfoComponent,
  },
  {
    path: 'login',
    component: fromEmployees.EmployeeLogInComponent,
  },
  {
    path: 'register',
    component: fromEmployees.EmployeeNewComponent,
  },
  {
    path: 'dashboard',
    component: fromDashboard.DashboardComponent,
  },
  {
    path: 'projects/:id',
    component: fromProjects.ProjectDetailsComponent,
  },
  {
    path: 'projects/:projectID/tasks/:taskID',
    component: fromTasks.TaskDetailsComponent,
  },
  {
    path: 'tasks/:taskID',
    component: fromTasks.TaskDetailsComponent,
  },
  {
    path: 'tasks/:taskID/edit',
    component: fromTasks.TaskEditComponent,
  },
  {
    path: 'employee/:id/detail',
    component: fromEmployees.EmployeeDetailsComponent,
  },
  {
    path: 'employees',
    children: [
      {
        path: '',
        component: fromEmployees.EmployeeListComponent,
        resolve: { employees: EmployeeResolver}
      },
      {
        path: ':id',
        component: fromEmployees.EmployeeDetailsComponent,
      },
      {
        path: ':id/edit',
        component: fromEmployees.EmployeeEditComponent
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing,
    scrollPositionRestoration: 'enabled',
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
