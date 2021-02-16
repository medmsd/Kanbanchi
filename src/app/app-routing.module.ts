import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './core/login/login.component';
import {LayoutPageComponent} from './core/layout-page/layout-page.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: LayoutPageComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'tasks'},
      {path: 'users', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
      {path: 'projects', loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)},
      {path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule)},
      {path: 'stats', loadChildren: () => import('./modules/stats/stats.module').then(m => m.StatsModule)},
      {path: '**', redirectTo: 'tasks', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
