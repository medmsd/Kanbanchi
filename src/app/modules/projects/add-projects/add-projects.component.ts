import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../core/models/user';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss']
})
export class AddProjectsComponent implements OnInit {
  private responsibles=['Mohamed','Ali','Ahmed'].map(this.createResponsible);
  private developers=['Amine','Wassim','Fahmi','Tayeb','Houssem','Slim'].map(this.createDeveloper);
  formGroup:FormGroup
  constructor(private formBuilder:FormBuilder) {
    this.formGroup=this.formBuilder.group({
    name:['',Validators.required],
      description:['',],
      responsible:[''],
      team:['']
    });
  }

  ngOnInit() {
  }

  createResponsible(name){
    return new User(name,name,name,name,name,"responsible");
  }  createDeveloper(name){
    return new User(name,name,name,name,name,"developer");
  }



}
