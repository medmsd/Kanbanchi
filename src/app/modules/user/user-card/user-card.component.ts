import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../core/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  edit(id){
    this.router.navigate(["/users/edit",id])
  }

  view(id: string) {
    this.router.navigate(['/users/view', id]);
  }
}
