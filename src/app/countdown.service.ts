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

    // future event
    if (today.valueOf() <= start.valueOf()) {
      console.log("future");
      this.countdown.days = this.getDays(today, start);
      this.countdown.months = this.getMonths(today, start);
      this.countdown.years = this.getYears(today, start);

      this.countdown.type = "until";

    } else if (today.valueOf() >= start.valueOf() && today.valueOf() <= end.valueOf()) {
      console.log("current");

      this.countdown.days = this.getDays(today, end);
      this.countdown.months = this.getMonths(today, end);
      this.countdown.years = this.getYears(today, end);

      this.countdown.type = "until end of";

    } else {
      console.log("past");

      this.countdown.days = this.getDays(end, today);
      this.countdown.months = this.getMonths(end, today);
      this.countdown.years = this.getYears(end, today);

      this.countdown.type = "since end of";

      if (this.countdown.days < 0) {
        this.countdown.months--;
        console.log(start.getMonth());
        this.countdown.days += this.daysInMonth(end) - 1;
      }

      if (this.countdown.months < 0) {
        this.countdown.years--;
        this.countdown.months += 12;
      }
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


  daysInMonth(date: Date) {
    switch (date.getMonth()) {
      case 1: // january
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
        return 31;
      case 4:
      case 6:
      case 9:
      case 11:
      case 12:
        return 30;
      case 2:
        if (date.getFullYear() % 4 == 0) {
          return 29;
        } else {
          return 28;
        }
    }
  }
}
