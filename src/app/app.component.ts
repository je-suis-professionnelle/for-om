import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {Item} from "./models/Item";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
  Element1 = new Item(1, "Item 2222", "Description 1");
}
