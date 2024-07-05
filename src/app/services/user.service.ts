import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from "pocketbase";
import {apiUrl} from "../app.config";
import {User} from "../models/User";
import {from, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  pb = new PocketBase(apiUrl);
  constructor() { }

  getUserById(userId: string): Observable<User> {
    return from(this.pb.collection('users').getOne(userId)).pipe(
      map((record: RecordModel) => {
        return this.mapRecordToUser(record);
      })
    );
  }

  private mapRecordToUser(record: RecordModel): User {
    return {
      id: record.id,
      username: record['username'],
      password: record['password'],
      created: new Date(record.created),
      updated: new Date(record.updated),
    }
  }
}
