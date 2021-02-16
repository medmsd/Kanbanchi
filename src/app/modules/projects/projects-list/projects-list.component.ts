import { Component, OnInit } from '@angular/core';
import {Project} from '../../../core/models/project';
import {ProjectService} from '../../../core/services/project/project.service';
import {User} from '../../../core/models/user';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  private projects: Project[];
  private filteredProjects: Project[];
  projectFilter = new FormControl();
  options = [];
  constructor(private projectService:ProjectService) { }

  ngOnInit() {
   this.projectService.findAll().subscribe((projects)=>{
      this.projects = projects;
     this.filteredProjects = projects;
     this.projects.map((project)=>this.options.push(project.id))
    })
  }

  onNameChange(projectID) {
    if (projectID == '') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter((project) => project.id.includes(projectID));
    }
  }
}
