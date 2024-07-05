import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
//import {pb} from "../app.config";
import {Lesson} from "../models/Lesson";
import {Observable, map, from} from 'rxjs';
import PocketBase, {ListResult, RecordModel} from "pocketbase";
import {apiUrl} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  pb = new PocketBase(apiUrl);

  constructor(private http: HttpClient) { }

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

  createLesson(lesson: Lesson): Observable<Lesson> {
    return from(this.pb.collection('lessons').create(lesson)).pipe(
      map((record: RecordModel) => this.mapRecordToLesson(record))
    );
  }

  /*getLesson(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${apiUrl}/lessons/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Failed to fetch lesson: ' + error.message)))
      );
  }

  createLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(`${apiUrl}/lessons`, lesson)
      .pipe(
        catchError(error => throwError(() => new Error('Failed to create lesson: ' + error.message)))
      );
  }

  deleteLesson(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/lessons/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Failed to delete lesson: ' + error.message)))
      );
  }*/
}
