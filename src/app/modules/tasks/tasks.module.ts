import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import {MaterialModule} from '../../shared/material.module';


@NgModule({
  declarations: [TasksComponent],
    imports: [
        CommonModule,
        TasksRoutingModule,
        MaterialModule
    ]
})
export class TasksModule { }
