export class Subject {
  id!: string;
  title!: string;
  created!: Date;
  updated!: Date;

  constructor(id: string, title: string, created: Date, updated: Date) {
    this.id = id;
    this.title = title;
    this.created = created;
    this.updated = updated;
  }
}
