import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Task} from '../../models/task';
import {environment} from '../../../../environments/environment';

const api = environment.apiUrl + '/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  public add(task: Task): Observable<Task> {
    return this.http.post<Task>(api, task).pipe(
      map((task) => {
        console.log(`Task ${task.id} has been added`);
        return task;
      })
      , catchError(this.handleError));
  }

  public update(task: Task): Observable<any> {
    return this.http.put<Task>(api + '/' + task.id, task).pipe(
      map((task) => console.log(`Task ${task.id} has been updated`))
      , catchError(this.handleError));
  }

  public delete(taskID: number): Observable<any> {
    return this.http.delete<Task>(api + '/' + taskID).pipe(
      map((task) => console.log(`Task ${taskID} has been deleted`))
      , catchError(this.handleError));

  }

  public find(taskID: number): Observable<Task> {
    return this.http.get<Task>(api + '/' + taskID).pipe(map((task) => {
      console.log(`Task ${taskID} has been founded`);
      return task;
    }), catchError(this.handleError),);
  }

  public findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(api).pipe(
      map((tasks) => {
        console.log(`Found ${tasks.length} tasks`);
        return tasks;
      })
      , catchError(this.handleError));
  }

  public getUserTask(userID): Observable<Task[]> {
    return this.http.get<Task[]>(api+"?createdBy="+userID).pipe(
      map((tasks) => {
        console.log(`Found ${tasks.length} tasks created by ${userID}`);
        return tasks;
      })
      , catchError(this.handleError));
  }

  private getToDo(): Observable<Task[]> {
    return this.http.get<Task[]>(api+"?type=todo").pipe(
      map((tasks) => {
        console.log(`Found ${tasks.length} tasks todo`);
        return tasks;
      })
      , catchError(this.handleError));
  }
  private getDoing(): Observable<Task[]> {
    return this.http.get<Task[]>(api+"?type=doing").pipe(
      map((tasks) => {
        console.log(`Found ${tasks.length} tasks doing`);
        return tasks;
      })
      , catchError(this.handleError));
  }
  private getDone(): Observable<Task[]> {
    return this.http.get<Task[]>(api+"?type=done").pipe(
      map((tasks) => {
        console.log(`Found ${tasks.length} tasks done`);
        return tasks;
      })
      , catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
