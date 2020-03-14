import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './core/login/login.component';


const routes: Routes = [
  {path: '',pathMatch:"full", redirectTo: 'tasks'},
  {path: 'users', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
  {path: 'projects', loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)},
  {path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule)},
  {path: 'stats', loadChildren: () => import('./modules/stats/stats.module').then(m => m.StatsModule)},
  {path:"login",redirectTo: "/(login:login)",pathMatch:"full"},
  {path:"**",redirectTo: "tasks",pathMatch: "full"},
  {path: 'login',outlet:"login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
