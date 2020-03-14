import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Project} from '../../models/project';
const api = environment.apiUrl + '/projects';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  public add(project: Project): Observable<Project> {
    return this.http.post<Project>(api, project).pipe(
      map((project)=>{
        console.log(`Project ${project.id} has been added`);
        return project;
      })
      ,catchError(this.handleError));
  }

  public update(project: Project): Observable<any> {
    return this.http.put<Project>(api + '/' + project.id, project).pipe(
      map((project) => console.log(`Project ${project.id} has been updated`))
      ,catchError(this.handleError));
  }

  public delete(projectName: string): Observable<any> {
    return this.http.delete<Project>(api + '/' + projectName).pipe(
      map((project)=>console.log(`Project ${projectName} has been deleted`))
      ,catchError(this.handleError));

  }

  public find(projectName: string): Observable<Project> {
    return this.http.get<Project>(api + '/' + projectName).pipe(map((project) => {
      console.log(`Project ${projectName} has been founded`);
      return project;
    }), catchError(this.handleError),);
  }

  public findAll(): Observable<Project[]> {
    return this.http.get<Project[]>(api).pipe(
      map((projects)=>{
        console.log(`Found ${projects.length} projects`);
        return projects;
      })
      ,catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
