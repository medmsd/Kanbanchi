import {User} from './user';

export class Project {
  constructor(
    public id:string,
    public description:string,
    public responsible:string,
    public team:string[]= [],
  ) {
  }
}
