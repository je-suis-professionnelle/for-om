import { Injectable } from '@angular/core';
import {Lesson} from "../models/Lesson";
import {Observable, map, from} from 'rxjs';
import PocketBase, {RecordModel} from "pocketbase";
import {apiUrl} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  pb = new PocketBase(apiUrl);

  constructor() { }

  getAllLessons(): Observable<Lesson[]> {
    return from(this.pb.collection('lessons').getFullList({
      sort: '-created'
    })).pipe(
      map((records: RecordModel[]) => {
        return records.map(record => this.mapRecordToLesson(record));
      })
    );
  }

  private mapRecordToLesson(record: RecordModel): Lesson {
    return {
      id: record.id,
      title: record['title'],
      created: new Date(record.created),
      updated: new Date(record.created),
      postCount: 0,
      lastPostDate: null
    }
  }

  getLessonById(id: string): Observable<Lesson> {
    return from(this.pb.collection('lessons').getOne(id)).pipe(
      map((record: RecordModel) => this.mapRecordToLesson(record))
    );
  }
}
