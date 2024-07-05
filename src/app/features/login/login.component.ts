import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginService } from "../../services/login.service";
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  async onSubmit() {
    try {
      const response = await firstValueFrom(this.loginService.login(this.username, this.password));
      localStorage.setItem('jwt', response.token);
      await this.router.navigate(['/']);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
