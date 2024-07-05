import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from "../../models/Lesson";
import {Router, RouterLink} from "@angular/router";
import {PostService} from "../../services/post.service";
import {DatePipe, NgIf} from "@angular/common";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DatePipe
  ],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent implements OnInit {
  @Input() lesson!: Lesson;

  constructor(private postService: PostService) { }

  async ngOnInit(): Promise<void> {
    if (this.lesson && this.lesson.id) {
      try {
        console.log(`Fetching posts for lesson ${this.lesson.id}`);  // Log before request
        const posts = await lastValueFrom(this.postService.getAllPostsByLesson(this.lesson.id));
        this.lesson.postCount = posts ? posts.length : 0;
        this.lesson.lastPostDate = posts && posts.length > 0 ? new Date(Math.max(...posts.map(post => new Date(post.created).getTime()))) : null;
      } catch (error) {
        console.error('Error fetching posts for lesson', error);
        this.lesson.postCount = 0;
        this.lesson.lastPostDate = null;
      }
    }
  }
}
