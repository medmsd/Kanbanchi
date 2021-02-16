import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {UserService} from '../services/user/user.service';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent implements OnInit {

  private user: User;
  private loaded = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.userID.subscribe((userID)=>{
      console.log(userID);
      if ( userID!=null && userID != "") {
        this.userService.user.subscribe((user) => {
          this.loaded = true;
          console.log('Layout Page');
          this.user = user;
        });
      }
      else{
        this.user = null;
        this.router.navigate(["/login"]);
      }
    })


  }

  logout() {
    this.userService.logout();
  }
}
