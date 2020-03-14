import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import {SharedModule} from '../../shared/shared.module';
import { UserCardComponent } from './user-card/user-card.component';
import { UserEditComponent } from './user-edit/user-edit.component';


@NgModule({
  declarations: [UserComponent, ListUsersComponent, AddUsersComponent, ViewUsersComponent, UserCardComponent, UserEditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
