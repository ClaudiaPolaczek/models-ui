export class User {
  constructor(
    public id: number,
    public email: string,
    public role: string,
    public main_photo_url: string,
    public avg_rate: number,
    public token?: string,
  ) {}
}
