import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';

import { catchError, map, retry, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  base_url = "/calendar/v3/users/me/calendarList";
  key = "?key=AIzaSyB0aafA1fTIR85gPqugdiMIoLfZjVkZuX4";
  res: {
    items?: Array<any>
  };
  error;
  constructor(private http: HttpClient) { }

  get(token: string) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')

    // https://stackoverflow.com/questions/37172928/angular-cli-server-how-to-proxy-api-requests-to-another-server
    return this.http.get(
      this.base_url.concat("?access_token=").concat(token),
      {
        'headers': headers,
        'responseType': 'json'
      }
    ).pipe(
      map(res => {
        console.log(res);
        this.res = res;
        return this.res.items;
      })
    );
  }

  set_cal(etaq: string) {
    console.log(etaq);
  }


}
