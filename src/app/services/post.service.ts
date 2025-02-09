import { Injectable } from '@angular/core';
import PocketBase, {RecordModel} from "pocketbase";
import {Post} from "../models/Post";
import {from, map, Observable} from "rxjs";
import {apiUrl} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  pb = new PocketBase(apiUrl);

  constructor() { }


  getAllPostsByLesson(lessonId: string): Observable<any[]> {
    return from(this.pb.collection('posts').getFullList({ filter: `lesson="${lessonId}"` }));
  }

  private mapRecordToPost(record: RecordModel): Post {
    return {
      id: record.id,
      content: record['content'],
      owner: record['owner'],
      ownerName: '',
      lesson: record['lesson'],
      subject: record['subject'],
      created: new Date(record['created']),
      updated: new Date(record.updated),
    }
  }

  getPostById(postId: string): Observable<Post> {
    return from(this.pb.collection('posts').getOne(postId)).pipe(
    map((record: RecordModel) => {
        return this.mapRecordToPost(record);
    })
    );
  }

  updatePost(id: string, post: Partial<Post>): Observable<Post> {
    return from(this.pb.collection('posts').update(id, post)).pipe(
      map((record: RecordModel) => this.mapRecordToPost(record))
    );
  }

  deletePost(id: string): Observable<void> {
    return from(this.pb.collection('posts').delete(id)).pipe(
      map(() => undefined)
    );
  }
}
