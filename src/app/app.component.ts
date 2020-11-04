import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Countdown';

  constructor(private authService: AuthService) { }

  user = this.authService.user;
  loggedIn = this.authService.isLoggedIn();


  handleLogin(): void {
    return this.loggedIn ? this.authService.logout() : this.authService.login();
  }

}
