import {Component, OnInit} from '@angular/core';
import {Lesson} from "../../models/Lesson";
import {LessonsService} from "../../services/lessons.service";
import {LessonComponent} from "../lesson/lesson.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {apiUrl} from "../../app.config";
import PocketBase from "pocketbase";
import {catchError, concatMap, map, of} from "rxjs";
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [
    LessonComponent,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent implements OnInit {

  pb = new PocketBase(apiUrl);
  lessons: Lesson[] = [];
  showModal = false;
  newLessonTitle = '';

  constructor(private lessonsService: LessonsService, private postService: PostService) {}

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons(): void {
    this.lessonsService.getAllLessons().subscribe({
      next: (lessons) => {
        this.lessons = lessons;
        this.updatePostCounts(lessons);
      },
      error: (error) => {
        console.error('Error fetching lessons', error);
      }
    });
  }

  updatePostCounts(lessons: Lesson[]): void {
    of(...lessons).pipe(
      concatMap(lesson =>
        this.postService.getAllPostsByLesson(lesson.id).pipe(
          catchError(error => {
            console.error(`Error fetching posts for lesson ${lesson.id}`, error);
            return of([]);
          }),
          map(posts => ({
            lessonId: lesson.id,
            postCount: posts.length,
            lastPostDate: posts.length > 0 ? new Date(Math.max(...posts.map(post => new Date(post.created).getTime()))) : null
          }))
        )
      )
    ).subscribe({
      next: ({ lessonId, postCount, lastPostDate }) => {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (lesson) {
          lesson.postCount = postCount;
          lesson.lastPostDate = lastPostDate;
        }
      },
      error: (error) => {
        console.error('Error fetching lessons or post counts', error);
      }
    });
  }

  async submitLesson(): Promise<void> {
    if (!this.pb.authStore.isValid) {
      console.error('User is not authenticated');
      return;
    }
    const data = {
      title: this.newLessonTitle,
      created: new Date(),
      updated: null
    };

    try {
      const record = await this.pb.collection('lessons').create(data);
      const newLesson: Lesson = {
        id: record.id,
        title: record['title'],
        created: new Date(record['created']),
        updated: new Date()
      };
      this.lessons.push(newLesson);
      this.loadLessons();
      this.showModal = false;
      this.newLessonTitle = '';
    } catch (error) {
      console.error('Error creating post', error);
    }
  }

  createLesson(): void {
    this.showModal = true;
  }

  cancel(): void {
    this.showModal = false;
  }
}
