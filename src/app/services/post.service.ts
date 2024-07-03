import { Injectable } from '@angular/core';
import PocketBase, {RecordModel} from "pocketbase";
import {Post} from "../models/Post";
import {from, map, Observable} from "rxjs";
import {Lesson} from "../models/Lesson";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  pb = new PocketBase('http://127.0.0.1:8090');

  constructor() { }

  getAllPostsByLesson(lessonId: string): Observable<Post[]> {
    return from(this.pb.collection('posts').getFullList({
      sort: '-created',
      filters: [
        {
          field: 'lesson',
          operator: '=',
          value: lessonId
        }
      ]
    })).pipe(
      map((records: RecordModel[]) => {
        return records.map(record => this.mapRecordToPost(record));
      })
    );
  }

  private mapRecordToPost(record: RecordModel): Post {
    return {
      id: record.id,
      content: record['content'],
      owner: record['owner'],
      lesson: record['lesson'],
      subject: record['subject'],
      created: new Date(record.created),
      updated: new Date(record.updated),
    }
  }

}
