import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  key = "?key=AIzaSyAWTKYhwcR8vTrdqc8GGvHfg_WNUWC-4bU";
  res: {
    items?: Array<any>
  };
  error;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  get_calendars() {
    let base_url = "/calendar/v3/users/me/calendarList" + this.key;

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET')
      .set('Authorization', 'Bearer ' + this.authService.getToken());

    // https://stackoverflow.com/questions/37172928/angular-cli-server-how-to-proxy-api-requests-to-another-server
    return this.http.get(
      base_url,
      {
        'headers': headers,
        'responseType': 'json'
      }
    ).pipe(
      map(res => {
        this.res = res;
        return this.res.items;
      })
    );
  }

  get_primary_calendar() {
    let base_url = "/calendar/v3/calendars/primary" + this.key;

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET')
      .set('Authorization', 'Bearer ' + this.authService.getToken());

    this.http.get(
      base_url,
      {
        'headers': headers,
        'responseType': 'json'
      }
    ).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    )
  }

  get_events(cal_id: string) {
    let base_url = "/calendar/v3/calendars/".concat(cal_id, "/events") + this.key;

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET')
      .set('Authorization', 'Bearer ' + this.authService.getToken());

    // https://stackoverflow.com/questions/37172928/angular-cli-server-how-to-proxy-api-requests-to-another-server
    return this.http.get(
      base_url,
      {
        'headers': headers,
        'responseType': 'json'
      }
    ).pipe(
      map(res => {
        this.res = res;
        return this.res.items;
      })
    );
  }


  get_primary_events() {
    let base_url = "/calendar/v3/calendars/primary/events" + this.key;

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET')
      .set('Authorization', 'Bearer ' + this.authService.getToken());

    // https://stackoverflow.com/questions/37172928/angular-cli-server-how-to-proxy-api-requests-to-another-server
    return this.http.get(
      base_url,
      {
        'headers': headers,
        'responseType': 'json'
      }
    ).pipe(
      map(res => {
        this.res = res;
        return this.res.items;
      })
    );
  }

  add_event(event: any, cal_id?: string) {

    if (cal_id == '') {
      cal_id = "primary";
    }
    let base_url = "/calendar/v3/calendars/" + cal_id + "/events" + this.key;

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methodss', 'POST')
      .set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post(
      base_url,
      event,
      { headers }
    ).pipe(
      map(res => {
        return res;
      })
    )

  }

  get_event(calendar: string, event: string) {
    let base_url = "/calendar/v3/calendars/" + calendar + "/events/" + event + this.key;

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methodss', 'GET')
      .set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get(
      base_url,
      { headers }
    ).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }

}
