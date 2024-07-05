import { Injectable } from '@angular/core';
import PocketBase, {RecordModel} from "pocketbase";
import {Post} from "../models/Post";
import {from, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  pb = new PocketBase('http://127.0.0.1:8090');

  constructor() { }

  createPost(post: Post): Observable<Post> {
    return from(this.pb.collection('posts').create(post)).pipe(
      map((record: RecordModel) => {
        return this.mapRecordToPost(record);
      })
    );
  }

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
      ownerName: '',
      lesson: record['lesson'],
      subject: record['subject'],
      created: new Date(record.created),
      updated: new Date(record.updated),
    }
  }

  getPostById(postId: string): Observable<Post> {
    console.log("postId", postId)
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
