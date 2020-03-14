export class Task {
  constructor(
    public id: number,
    public name: string,
    public createdBy: string,
    public date: string,
    public type:string) {
  }
}
