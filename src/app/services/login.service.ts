import { Injectable } from '@angular/core';
import {Observable, catchError, throwError, from} from 'rxjs';
import {apiUrl} from "../app.config";
import PocketBase from "pocketbase";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private pb: PocketBase;

  constructor(private router: Router) {
    this.pb = new PocketBase(apiUrl);
  }

  login(username: string, password: string): Observable<any> {
    return from(this.pb.collection('users').authWithPassword(username, password))
      .pipe(
        catchError(error => throwError(() => new Error('Login failed: ' + error.message)))
      );
  }

  async logout(): Promise<void> {
    this.pb.authStore.clear();
    await this.router.navigate(['/login']);
  }

  isAuthValid(): boolean {
    return this.pb.authStore.isValid;
  }
}
