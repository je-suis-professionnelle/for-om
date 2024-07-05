import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {apiUrl} from "../app.config";
import PocketBase from "pocketbase";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  pb = new PocketBase(apiUrl);

  constructor(private router: Router) { }

  canActivate(): boolean {
    /*const token = localStorage.getItem('jwt');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;*/
    console.log("authStore", this.pb.authStore.isValid);
    if (!this.pb.authStore.isValid) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.pb.authStore.isValid;
  }
}
