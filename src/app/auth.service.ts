import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

/* import {Request, Response} from "express";
import * as express from 'express';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs"; */
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: SocialUser;


  constructor(
    private http: HttpClient,
    private google: SocialAuthService,
  ) { }

  login() {
    this.google.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.setSession;
    this.google.authState.subscribe((user) => {
      this.user = user;
    });
  }

  private setSession(authResult) {
      const expiresAt = moment().add(authResult.expiresIn,'second');

      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
      this.google.signOut();
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }
}

/* const app: Application = express();
app.use(bodyParser.json());
app.route('/api/login')
    .post(loginRoute);
const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');
export function loginRoute(req: Request, res: Response) {
    const email = req.body.email,
          password = req.body.password;

    if (validateEmailAndPassword()) {
       const userId = findUserIdForEmail(email);

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 120,
                subject: userId
            }

          // send the JWT back to the user
          // TODO - multiple options available
    } else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
}
 */
