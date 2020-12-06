import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';

import { catchError, map, retry, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';


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
    private authService: AuthService
  ) { }

  get_calendars() {
    let base_url = "/calendar/v3/users/me/calendarList";

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
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
    let base_url = "calendar/v3/calendars/primary";

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
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
    let base_url = "/calendar/v3/calendars/".concat(cal_id, "/events");

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
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
    let base_url = "/calendar/v3/calendars/primary/events";

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
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
    let base_url = "/calendar/v3/calendars/primary/events";

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methodss', 'POST')
      .set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post(
      base_url,
      event,
      { headers }
    ).subscribe((res) => {
      console.log(res);
    })
  }

}
