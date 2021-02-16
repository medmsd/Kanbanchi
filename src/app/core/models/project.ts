import {User} from './user';

export class Project {
  constructor(
    public id:string,
    public description:string,
    public manager:string,
    public developers:string[]= [],
  ) {
  }
}
