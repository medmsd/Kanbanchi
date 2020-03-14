import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/models/user';
import {UserService} from '../../../core/services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {delay, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  private userForm: FormGroup;
  private user: User;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private route: ActivatedRoute,private router:Router) {

  }

  ngOnInit() {
    this.route.paramMap.pipe(delay(250),
      switchMap((params: ParamMap) =>
        this.userService.find(params.get('id'))
      )).subscribe((user)=>{
      this.user=user;
      this.userForm = this.formBuilder.group({
        id: ["", Validators.required],
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", Validators.required],
        role: ["", Validators.required],
      });
    });

  }

  get f() {
    return this.userForm.controls;
  }

  submit() {
    let user: User = Object.assign({}, this.userForm.value);
    this.userService.add(user);
  }
  return(){
    this.router.navigate(["/users/list"])
  }
}
