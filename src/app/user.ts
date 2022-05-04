export class User {
  constructor(
    public id: number,
    public email: string,
    public role: string,
    public mainPhotoUrl: string,
    public avgRate: number,
    public token?: string,
  ) {}
}
