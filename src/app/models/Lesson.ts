export class Lesson {
  id!: string;
  title!: string;
  created!: Date;
  updated!: Date;
  postCount?: number;
  lastPostDate?: Date | null;

  constructor(id: string, title: string, created: Date, updated: Date) {
    this.id = id;
    this.title = title;
    this.created = created;
    this.updated = updated;
  }
}
