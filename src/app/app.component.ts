import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { InfoBarComponent } from './info-bar/info-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public mobile = false;
  public currentSite;
  public user;
  public theme = "light-theme";

  constructor(
    public router: Router,
    public authService: AuthService,
    public overlayContainer: OverlayContainer
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

  toggleChange() {
    console.log(this.theme);
    this.overlayContainer.getContainerElement().classList.remove(this.theme);
    if (this.theme == "light-theme") {
      this.theme = "dark-theme";
    } else {
      this.theme = "light-theme"
    }
    this.overlayContainer.getContainerElement().classList.add(this.theme);

  }

}
