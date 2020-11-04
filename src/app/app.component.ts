import { Component } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Countdown';
  mode = true;
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    if (this.loggedIn) {
      return this.signOut();
    }
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log(this.authService.initState);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
