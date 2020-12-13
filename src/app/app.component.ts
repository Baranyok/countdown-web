import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public mobile = false;
  public currentSite;
  public user;
  public drawer: MatDrawer;
  public drawerOpen: boolean;
  public theme = "light-theme";
  public size: string;

  constructor(
    public router: Router,
    public authService: AuthService,
    public overlayContainer: OverlayContainer,
    public breakpointObserver: BreakpointObserver
  ) {
    router.events.subscribe((event: NavigationEnd) => {
      this.currentSite = this.router.url;
    });

    breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      if (result.matches) {
        this.drawerOpen = false;
        this.size = "small";
      } else {
        this.size = "large";
      }
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

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

}
