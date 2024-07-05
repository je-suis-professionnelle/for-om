import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { PostService } from "../../services/post.service";
import { UserService } from "../../services/user.service";
import { Post } from "../../models/Post";
import { User } from "../../models/User";
import { Lesson } from "../../models/Lesson";
import { lastValueFrom } from "rxjs";
import {LucideAngularModule} from "lucide-angular";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {apiUrl} from "../../app.config";
import PocketBase from "pocketbase";
import {LessonsService} from "../../services/lessons.service";

@Component({
  selector: 'app-post-content',
  standalone: true,
  imports: [
    LucideAngularModule,
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  pb = new PocketBase(apiUrl);
  postId: string | null = null;
  lesson: Lesson | null = null;
  post: Post | null = null;
  author: User | null = null;
  showModal: boolean = false;
  editPostContent: string = '';
  editPostTitle: string = '';

  constructor(
    private postsService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private lessonService: LessonsService
  ) { }

  async ngOnInit(): Promise<void> {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (!this.postId) {
      console.error('No lesson ID found in route');
      return;
    }
    await this.loadPost();
    if (this.post && this.post.owner) {
      await this.loadAuthor();
    }
    await this.loadLesson();
  }

  async loadPost(): Promise<void> {
    try {
      if (this.postId) {
        const post = await lastValueFrom(this.postsService.getPostById(this.postId));
        if (post) {
          this.post = post;
        } else {
          console.error('No post found');
        }
      } else {
        console.error('No lesson ID found in route');
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
    }
  }

  async loadAuthor(): Promise<void> {
    try {
      console.log("owner", this.post?.owner);
      if (this.post && this.post.owner) {
        this.author = await lastValueFrom(this.userService.getUserById(this.post.owner));
        console.log("author", this.author);
      } else {
        console.error('No author ID provided in lesson');
      }
    } catch (error) {
      console.error('Error loading author:', error);
    }
  }

  async loadLesson(): Promise<void> {
    if (this.post && this.post.lesson) {
      try {
        this.lesson = await lastValueFrom(this.lessonService.getLessonById(this.post.lesson));
      } catch (error) {
        console.error('Error loading lesson:', error);
      }
    } else {
      console.error('No lesson ID provided in post');
    }
  }

  openEditModal(): void {
    if (this.post) {
      this.editPostTitle = this.post.subject;
      this.editPostContent = this.post.content;
      this.showModal = true;
    }
  }

  async submitEditPost(): Promise<void> {
    // @ts-ignore
    if (this.post && this.post.owner == this.pb.authStore.model.id) {
      const updatedData = {
        ...this.post,
        subject: this.editPostTitle,
        content: this.editPostContent
      };

      try {
        await lastValueFrom(this.postsService.updatePost(this.post.id, updatedData));
        this.post.subject = this.editPostTitle;
        this.post.content = this.editPostContent;
        this.showModal = false;
      } catch (error) {
        console.error('Error updating post', error);
      }
    }
  }

  async deletePost(): Promise<void> {
    // @ts-ignore
    if (this.post && this.post.owner == this.pb.authStore.model.id) {
      try {
        await lastValueFrom(this.postsService.deletePost(this.post.id));
        await this.router.navigate(['/lessons/' + this.post.lesson + '/posts']);
      } catch (error) {
        console.error('Error deleting post', error);
      }
    }
  }

  cancel(): void {
    this.showModal = false;
    this.editPostTitle = '';
    this.editPostContent = '';
  }
}
