import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/models/user';
import {UserService} from '../../../core/services/user/user.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  private users: User[];
  private filteredUsers: User[];
  userFilter = new FormControl();
  options = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.findAll().subscribe(users => {
      this.users = users.filter((user)=>user.id!=this.userService.userID.value);
      this.filteredUsers = this.users;
      this.users.map((user) => this.options.push(user.id));
    });
  }

  onUsernameChange(userID) {
    if (userID == '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((user) => user.id.includes(userID));
    }
  }


}
