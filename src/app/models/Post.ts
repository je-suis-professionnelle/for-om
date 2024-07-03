export class Post {
  id!: string;
  content!: string;
  owner!: string;
  lesson!: string;
  subject!: string;
  created!: Date;
  updated!: Date;

  constructor(id: string, content: string, owner: string, lesson: string, subject: string, created: Date, updated: Date) {
    this.id = id;
    this.content = content;
    this.owner = owner;
    this.lesson = lesson;
    this.subject = subject;
    this.created = created;
    this.updated = updated;
  }
}
