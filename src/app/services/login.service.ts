import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError, throwError, from} from 'rxjs';
import {apiUrl} from "../app.config";
import PocketBase from "pocketbase";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private pb: PocketBase;

  constructor(private http: HttpClient) {
    this.pb = new PocketBase(apiUrl);
  }

  login(username: string, password: string): Observable<any> {
    return from(this.pb.collection('users').authWithPassword(username, password))
      .pipe(
        catchError(error => throwError(() => new Error('Login failed: ' + error.message)))
      );
  }

  logout(): void {
    this.pb.authStore.clear();
  }

  loginWithOAuth2(provider: string): Observable<any> {
    return from(this.pb.collection('users').authWithOAuth2({ provider }))
      .pipe(
        catchError(error => throwError(() => new Error('OAuth login failed: ' + error.message)))
      );
  }

  getAuthToken(): string | null {
    return this.pb.authStore.token;
  }

  isAuthValid(): boolean {
    return this.pb.authStore.isValid;
  }
}
