import { Injectable } from '@angular/core';
import { Countdown } from './event-dialog/event-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdown: Countdown = {
    seconds: 0,
    minutes: 0,
    hours: 0,

    days: 0,
    months: 0,
    years: 0,

    time: false
  }
  constructor() { }

  getCountdown(event): Countdown {
    let today = new Date();
    let start = new Date(event.start.dateTime == null ? event.start.date : event.start.dateTime);
    let end = new Date(event.end.dateTime == null ? event.end.date : event.end.dateTime);

    this.countdown.time = event.start.dateTime != null;

    // future event
    if (today.valueOf() <= start.valueOf()) {
      this.countdown.seconds = this.getSeconds(today, start);
      this.countdown.minutes = this.getMinutes(today, start);
      this.countdown.hours = this.getHours(today, start);

      this.countdown.days = this.getDays(today, start);
      this.countdown.months = this.getMonths(today, start);
      this.countdown.years = this.getYears(today, start);

      this.countdown.type = "future";

      this.countdown = this.editCountdown(today, this.countdown);

    } else if (today.valueOf() >= start.valueOf() && today.valueOf() <= end.valueOf()) {

      this.countdown.seconds = this.getSeconds(today, end);
      this.countdown.minutes = this.getMinutes(today, end);
      this.countdown.hours = this.getHours(today, end);

      this.countdown.days = this.getDays(today, end);
      this.countdown.months = this.getMonths(today, end);
      this.countdown.years = this.getYears(today, end);

      this.countdown.type = "current";

      this.countdown = this.editCountdown(today, this.countdown);

    } else {

      this.countdown.seconds = this.getSeconds(end, today);
      this.countdown.minutes = this.getMinutes(end, today);
      this.countdown.hours = this.getHours(end, today);

      this.countdown.days = this.getDays(end, today);
      this.countdown.months = this.getMonths(end, today);
      this.countdown.years = this.getYears(end, today);

      this.countdown.type = "past";

      this.countdown = this.editCountdown(end, this.countdown);

    }

    return this.countdown;
  }

  getSeconds(start: Date, end: Date) {
    return end.getSeconds() - start.getSeconds();
  }

  getMinutes(start: Date, end: Date) {
    return end.getMinutes() - start.getMinutes();
  }

  getHours(start: Date, end: Date) {
    return end.getHours() - start.getHours()
  }

  getDays(start: Date, end: Date) {
    return end.getDate() - start.getDate();
  }

  getMonths(start: Date, end: Date) {
    return end.getMonth() - start.getMonth();
  }

  getYears(start: Date, end: Date) {
    return end.getFullYear() - start.getFullYear();
  }

  editCountdown(end: Date, edited: Countdown) {

    if (edited.seconds <= 0) {
      edited.minutes--;
      edited.seconds = 59;
    } else if (edited.seconds >= 60) {
      edited.seconds = 1;
      edited.minutes++;
    }

    if (edited.minutes < 0) {
      edited.hours--;
      edited.minutes = 59;
    } else if (edited.minutes >= 60) {
      edited.minutes = 0;
      edited.hours++;
    }

    if (edited.hours < 0) {
      edited.days--;
      edited.hours = 23;
    } else if (edited.hours >= 24) {
      edited.hours = 0;
      edited.days++;
    }

    if (edited.days < 0) {
      edited.months--;
      edited.days += this.daysInMonth(end) - 1;
    } else if (edited.days > this.daysInMonth(end)) {
      edited.days = 1;
      edited.months++;
    }

    if (edited.months < 0) {
      edited.years--;
      edited.months = 11;
    } else if (edited.months > 12) {
      edited.months = 0;
      edited.years++;
    }

    return edited;
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
