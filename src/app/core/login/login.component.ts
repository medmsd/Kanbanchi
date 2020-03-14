import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {

  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(value) {
    this.userService.login(value.email, value.password).subscribe((user) => {
      console.log(user);
      if (user != null) {
        this.router.navigateByUrl('/tasks');
      }
    });
  }

}
