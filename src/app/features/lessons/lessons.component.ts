import {Component, OnInit} from '@angular/core';
import {Lesson} from "../../models/Lesson";
import {LessonsService} from "../../services/lessons.service";
import {LessonComponent} from "../lesson/lesson.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [
    LessonComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent implements OnInit {

  lessons: Lesson[] = [];

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
}
