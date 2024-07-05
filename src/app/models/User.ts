export class User {
  id!: string;
  username!: string;
  password!: string;
  created!: Date;
  updated!: Date;

  constructor(id: string, username: string, password: string, created: Date, updated: Date) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.created = created;
    this.updated = updated;
  }
}
