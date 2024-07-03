import {Component, Input} from '@angular/core';
import {Lesson} from "../../models/Lesson";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent {
  @Input() lesson!: Lesson;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLesson(): void {
    this.router.navigate(['/lessons', this.lesson.id]);
  }
}
