import {Component, OnInit} from '@angular/core';
import {PostComponent} from "../post/post.component";
import {NgForOf, NgIf} from "@angular/common";
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-posts',
  standalone: true,
    imports: [
        PostComponent,
        NgForOf,
        NgIf
    ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  lessonId: string | null = '';

  constructor(private postsService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!this.route.snapshot.paramMap.has('id')) {
      console.error('No lesson ID found in route');
      return;
    } else {
      this.lessonId = this.route.snapshot.paramMap.get('id');
    }
    this.loadPosts();
  }

  loadPosts(): void {
    if(this.lessonId === null) {
      console.error('No lesson ID found in route');
      return;
    }
    this.postsService.getAllPostsByLesson(this.lessonId).subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.error('Error fetching posts', error);
      }
    });
  }
}
