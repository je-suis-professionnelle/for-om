import { Component } from '@angular/core';
import {LessonsComponent} from "../lessons/lessons.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LessonsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
