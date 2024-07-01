export class User {
  id!: number;
  username!: string;
  email!: string;
  name!: string;
  pwd!: string;

  constructor(id: number, username: string, email: string, name: string, pwd: string) {
    this.id = id;
    this.username = name;
    this.email = email;
    this.name = name;
    this.pwd = pwd;
  }

  add() : void {
    this.id++;
  }
}
