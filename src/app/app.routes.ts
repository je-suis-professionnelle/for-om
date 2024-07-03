import { Routes } from '@angular/router';
import {LoginComponent} from "./features/login/login.component";
import {HomeComponent} from "./features/home/home.component";
import {PostsComponent} from "./features/posts/posts.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'posts/:id', component: PostsComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
];

// Add login route
// Add main page route
// Add item route

