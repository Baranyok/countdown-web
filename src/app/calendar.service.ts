import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';

import { catchError, map, retry, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  key = "?key=AIzaSyB0aafA1fTIR85gPqugdiMIoLfZjVkZuX4";
  res: {
    items?: Array<any>
  };
  error;
  constructor(private http: HttpClient) { }

  get_calendars(token: string) {
    let base_url = "/calendar/v3/users/me/calendarList".concat("?access_token=").concat(token)

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')

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

  get_primary_calendar(token: string) {
    let base_url = "calendar/v3/calendars/primary?access_token=".concat(token);

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')

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

  get_events(token: string, cal_id: string) {
    let base_url = "/calendar/v3/calendars/".concat(cal_id).concat("/events?access_token=", token);

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')

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

  add_event(token: string, cal_id: string, event: any) {
    console.log(event);
    let base_url = "/calendar/v3/calendars/primary/events".concat('?access_token=', token);

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methodss', 'POST')

    return this.http.post(
      base_url,
      event,
      { headers }
    ).subscribe((res) => {
      console.log(res);
    })
  }

}
