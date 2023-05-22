export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public picture: string,
    public userrights: Array<any>

  ) {
  }
}
