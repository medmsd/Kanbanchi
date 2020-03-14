import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjectsComponent} from './projects.component';
import {ProjectsListComponent} from './projects-list/projects-list.component';
import {AddProjectsComponent} from './add-projects/add-projects.component';
import {ViewProjectsComponent} from './view-projects/view-projects.component';
import {ProjectEditComponent} from './project-edit/project-edit.component';

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'list', component: ProjectsListComponent},
  {path: 'add', component: AddProjectsComponent},
  {path: 'view/:id', component: ViewProjectsComponent},
  {path: 'edit/:id', component: ProjectEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
