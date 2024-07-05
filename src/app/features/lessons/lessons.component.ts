import {Component, OnInit} from '@angular/core';
import {Lesson} from "../../models/Lesson";
import {LessonsService} from "../../services/lessons.service";
import {LessonComponent} from "../lesson/lesson.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Post} from "../../models/Post";
import {apiUrl} from "../../app.config";
import PocketBase from "pocketbase";

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

  constructor(private lessonsService: LessonsService) { }

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons(): void {
    this.lessonsService.getAllLessons().subscribe({
      next: (data) => {
        this.lessons = data;
      },
      error: (error) => {
        console.error('Error fetching lessons', error);
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
