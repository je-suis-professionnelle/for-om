import {Component, importProvidersFrom} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import PocketBase from "pocketbase";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {Home, LucideAngularModule} from "lucide-angular";
import {bootstrapApplication} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LucideAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  ngOnInit(): void {
    const pb = new PocketBase("http://127.0.0.1:8090");
  }
}
