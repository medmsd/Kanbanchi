import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import {SharedModule} from '../../shared/shared.module';
import { ProjectCardComponent } from './project-card/project-card.component';
import {ProjectsListComponent} from './projects-list/projects-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';


@NgModule({
  declarations: [ProjectsComponent, AddProjectsComponent, ProjectsListComponent, ViewProjectsComponent, ProjectCardComponent, ProjectEditComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule { }
