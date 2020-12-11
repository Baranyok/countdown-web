import { Injectable } from '@angular/core';
import { Countdown } from './event-dialog/event-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdown: Countdown = {
    days: 0,
    months: 0,
    years: 0,

    type: ""
  }
  constructor() { }

  getCountdown(event): Countdown {
    let today = new Date();
    let start = new Date(event.start.dateTime == null ? event.start.date : event.start.dateTime);
    let end = new Date(event.end.dateTime == null ? event.end.date : event.end.dateTime);

    console.log(today, start, end);

    if (today.valueOf < start.valueOf) {
      this.countdown.days = this.getDays(today, start);
      this.countdown.months = this.getMonths(today, start);
      this.countdown.years = this.getYears(today, start);

      this.countdown.type = "until";
    } else if (today.valueOf > start.valueOf && today.valueOf < end.valueOf) {
      this.countdown.days = this.getDays(today, end);
      this.countdown.months = this.getMonths(today, end);
      this.countdown.years = this.getYears(today, end);

      this.countdown.type = "until end of";
    } else {
      this.countdown.days = this.getDays(end, today);
      this.countdown.months = this.getMonths(end, today);
      this.countdown.years = this.getYears(end, today);

      this.countdown.type = "since end of";
    }

    return this.countdown;
  }

  getDays(start: Date, end: Date) {
    return end.getDate() - start.getDate();
  }

  getMonths(start: Date, end: Date) {
    return end.getMonth() - start.getMonth();
  }

  getYears(start: Date, end: Date) {
    return end.getFullYear() - end.getFullYear();
  }
}
