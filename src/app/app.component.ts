import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  user: gapi.auth2.GoogleUser;

  public mobile = false;
  public currentSite;

  constructor(public router: Router) {
    router.events.subscribe((event: NavigationEnd) => {
      this.currentSite = this.router.url;
    });
  }

  async ngOnInit() {
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance.currentUser.get();
    }
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({
          client_id: '346300399779-ct1nl6nntohmj3aajruu4klgstqrdkmq.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/calendar',
        })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    if (this.user) {
      this.authInstance.signOut().then(() => {
        this.user = null;
      })
    } else {
      // Resolve or reject signin Promise
      return new Promise(async () => {
        await this.authInstance.signIn().then(
          user => {
            this.user = user;
          },
          error => this.error = error);

      });
    }


  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }

}
