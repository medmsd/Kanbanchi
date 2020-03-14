import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserComponent} from './user.component';
import {ListUsersComponent} from './list-users/list-users.component';
import {AddUsersComponent} from './add-users/add-users.component';
import {ViewUsersComponent} from './view-users/view-users.component';
import {UserEditComponent} from './user-edit/user-edit.component';

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'list', component: ListUsersComponent},
  {path: 'add', component: AddUsersComponent},
  {path: 'view/:id', component: ViewUsersComponent},
  {path: 'edit/:id', component: UserEditComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
