import { Component } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import {LoginService} from "../../services/login.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LucideAngularModule,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  title: string = 'For\'om';
  constructor(private authService: LoginService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthValid();
  }
}
