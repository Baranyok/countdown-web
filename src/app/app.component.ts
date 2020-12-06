import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public mobile = false;
  public currentSite;
  public user;

  constructor(
    public router: Router,
    public authService: AuthService
  ) {
    router.events.subscribe((event: NavigationEnd) => {
      this.currentSite = this.router.url;
    });
  }

  async ngOnInit() {
    await this.authService.checkIfUserAuthenticated();
  }

  authenticate() {
    return this.authService.authenticate();
  }

}
