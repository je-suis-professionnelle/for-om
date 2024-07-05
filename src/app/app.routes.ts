import { Routes } from '@angular/router';
import {LoginComponent} from "./features/login/login.component";
import {HomeComponent} from "./features/home/home.component";
import {PostsComponent} from "./features/posts/posts.component";
import {PostContentComponent} from "./features/post-content/post-content.component";
import {AuthGuard} from "./shared/authguard";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'lessons/:id/posts', component: PostsComponent, canActivate: [AuthGuard]},
  { path: 'posts/:id', component: PostContentComponent, canActivate: [AuthGuard]},
];
