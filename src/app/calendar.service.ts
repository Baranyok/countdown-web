import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  key = "?key=AIzaSyB0aafA1fTIR85gPqugdiMIoLfZjVkZuX4";
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
    let base_url = "https://www.googleapis.com/calendar/v3/users/me/calendarList" + this.key;

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
    let base_url = "https://www.googleapis.com/calendar/v3/calendars/primary" + this.key;

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
    let base_url = "https://www.googleapis.com/calendar/v3/calendars/".concat(cal_id, "/events") + this.key;

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
    let base_url = "https://www.googleapis.com/calendar/v3/calendars/primary/events" + this.key;

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
    console.log(event);
    let base_url = "https://www.googleapis.com/calendar/v3/calendars/primary/events" + this.key;

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methodss', 'POST')
      .set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post(
      base_url,
      event,
      { headers }
    ).subscribe({
      next: res => {
        this.snackBar.openFromComponent(InfoBarComponent, {
          data: "Request successful",
          duration: 2000
        })
      },
      error: error => {
        this.snackBar.openFromComponent(InfoBarComponent, {
          data: "Request failed",
          duration: 2000
        })
      }
    })
  }

  get_event(calendar: string, event: string) {
    let base_url = "https://www.googleapis.com/calendar/v3/calendars/" + calendar + "/events/" + event + this.key;

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
