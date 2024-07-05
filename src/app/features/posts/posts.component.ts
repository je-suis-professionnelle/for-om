import {Component, OnInit} from '@angular/core';
import {PostComponent} from "../post/post.component";
import {NgForOf, NgIf} from "@angular/common";
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {lastValueFrom} from "rxjs";
import {FormsModule} from "@angular/forms";
import PocketBase from "pocketbase";
import {apiUrl} from "../../app.config";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    PostComponent,
    NgForOf,
    NgIf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  pb = new PocketBase(apiUrl);
  posts: Post[] = [];
  lessonId: string | null = '';
  showModal: boolean = false;
  newPostTitle: string = '';
  newPostContent: string = '';

  constructor(private postsService: PostService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    if(!this.route.snapshot.paramMap.has('id')) {
      console.error('No lesson ID found in route');
      return;
    } else {
      this.lessonId = this.route.snapshot.paramMap.get('id');
    }
    this.loadPosts();
  }

  async loadPosts(): Promise<void> {
    if (!this.lessonId) {
      console.error('No lesson ID found in route');
      return;
    }
    try {
      const posts = await lastValueFrom(this.postsService.getAllPostsByLesson(this.lessonId));
      this.posts = await Promise.all(posts.map(async post => {
        const user = await lastValueFrom(this.userService.getUserById(post.owner));
        return { ...post, ownerName: user.username };
      }));
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  }

  async createPost(): Promise<void> {
    this.showModal = true;
  }

  async submitPost(): Promise<void> {
    if (!this.pb.authStore.isValid) {
      console.error('User is not authenticated');
      return;
    }
    if (this.lessonId) {
      const data = {
        content: this.newPostContent,
        // @ts-ignore
        owner: this.pb.authStore.model.id,
        lesson: this.lessonId,
        subject: this.newPostTitle,
      };

      try {
        const record = await this.pb.collection('posts').create(data);
        const newPost: Post = {
          id: record.id,
          content: record['content'],
          owner: record['owner'],
          // @ts-ignore
          ownerName: 'michel',
          lesson: record['lesson'],
          subject: record['subject'],
          created: new Date(),
          updated: null
        };
        this.posts.push(newPost);
        this.showModal = false;
        this.newPostTitle = '';
        this.newPostContent = '';
      } catch (error) {
        console.error('Error creating post', error);
      }
    }
  }

  cancel(): void {
    this.showModal = false;
    this.newPostTitle = '';
    this.newPostContent = '';
  }
}
