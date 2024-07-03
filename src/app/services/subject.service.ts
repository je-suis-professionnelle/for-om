import { Injectable } from '@angular/core';
import PocketBase from "pocketbase";
import {apiUrl} from "../app.config";
import {Observable} from "rxjs";
import {Subject} from "../models/Subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  pb = new PocketBase(apiUrl);

  constructor() { }

  getSubjectById(subjectId: string): Observable<Subject> {
    return new Observable<Subject>(subscriber => {
      this.pb.collection('subjects').getOne(subjectId).then((record) => {
        subscriber.next(this.mapRecordToSubject(record));
        subscriber.complete();
      }).catch((error) => {
        subscriber.error(error);
      });
    });
  }

  private mapRecordToSubject(record: any): Subject {
    return {
      id: record.id,
      title: record['title'],
      updated: new Date(record.updated),
      created: new Date(record.created)
    }
  }
}
