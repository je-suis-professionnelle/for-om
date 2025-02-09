import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from "../../models/Lesson";
import {RouterLink} from "@angular/router";
import {PostService} from "../../services/post.service";
import {DatePipe, NgIf} from "@angular/common";

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
        const posts = await this.postService.getAllPostsByLesson(this.lesson.id).toPromise();
        // @ts-ignore
        this.lesson.postCount = posts.length;
        // @ts-ignore
        this.lesson.lastPostDate = posts.length > 0 ? new Date(Math.max(...posts.map(post => new Date(post.created).getTime()))) : null;
      } catch (error) {
        console.error('Error fetching posts for lesson', error);
        this.lesson.postCount = 0;
        this.lesson.lastPostDate = null;
      }
    }
  }
}
