import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
//import {pb} from "../app.config";
import {Lesson} from "../models/Lesson";
import {Observable, map, from} from 'rxjs';
import PocketBase, {ListResult, RecordModel} from "pocketbase";

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  pb = new PocketBase('http://127.0.0.1:8090');

  constructor(private http: HttpClient) { }

  async getAllLessons2(): Promise<ListResult<RecordModel>> {
    return await this.pb.collection('lessons').getList(1, 50);
  }

  getAllLessons(): Observable<Lesson[]> {
    return from(this.pb.collection('lessons').getFullList({
      sort: '-created'
    })).pipe(
      map((records: RecordModel[]) => {
        return records.map(record => this.mapRecordToLesson(record));
      })
    );
  }

  // Utility function to map RecordModel to Lesson
  private mapRecordToLesson(record: RecordModel): Lesson {
    return {
      id: record.id,
      title: record['title'],
      created: new Date(record.created),
      updated: new Date(record.created),
    }
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
