import {Injectable} from '@angular/core';
import {User} from '../../models/user';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

const api = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userID: BehaviorSubject<string>;

  constructor(private http: HttpClient, private router: Router) {
    this.userID = new BehaviorSubject<string>(sessionStorage.getItem('userID'));
  }

  get user(): Observable<User> {
    let userID = sessionStorage.getItem('userID');
    console.log(userID);
    if (userID != null) {
      return this.find(userID);
    }
    return of<User>(null);
  }

  public add(user: User): Observable<User> {
    return this.http.post<User>(api, user).pipe(
      map((user) => {
        console.log(`User ${user.id} has been added`);
        return user;
      })
      , catchError(this.handleError));
  }

  public update(user: User): Observable<any> {
    return this.http.put<User>(api + '/' + user.id, user).pipe(
      map((user) => console.log(`User ${user.id} has been updated`))
      , catchError(this.handleError));
  }

  public delete(username: string): Observable<any> {
    return this.http.delete<User>(api + '/' + username).pipe(
      map((user) => console.log(`User ${username} has been deleted`))
      , catchError(this.handleError));

  }

  public find(username: string): Observable<User> {
    return this.http.get<User>(api + '/' + username).pipe(map((user) => {
      console.log(`User ${username} has been founded`);
      return user;
    }), catchError(this.handleError),);
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(api).pipe(
      map((users) => {
        console.log(`Found ${users.length} users`);
        return users;
      })
      , catchError(this.handleError));
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(api + '?email=' + email + '&password=' + password).pipe(map((users) => {
        if (users.length != 0) {
         sessionStorage.setItem('userID', users[0].id);
          this.userID.next(users[0].id);
          console.log('User ' + users[0].id+ ' connected');
          return users[0];
        }
        console.log('User not found');
        return null;
      }
      ),
      catchError(this.handleError));
  }

  public logout() {
    sessionStorage.removeItem('userID');
    this.userID.next("");
    console.log("Disconnecting");
    this.router.navigate(["",{outlets:{login:"login"}}])
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
