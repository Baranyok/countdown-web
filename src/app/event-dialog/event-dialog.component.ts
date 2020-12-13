import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountdownService } from '../countdown.service';

export interface Event {
  summary: string;
  id: string;

  start: {
    date,
    dateTime
  },

  end: {
    date,
    dateTime
  }
}

export interface Countdown {
  seconds: number,
  minutes: number,
  hours: number,

  days: number,
  months: number,
  years: number,

  time: boolean,
  type?: 'current' | 'future' | 'past',

}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {
  public countdown: Countdown;
  url: string;
  private calendar: string;
  public event: Event;

  public size: string;
  private interval;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private coutndownService: CountdownService,
    public breakpointObserver: BreakpointObserver

  ) {
    breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      if (result.matches) {
        this.size = "small";
      } else {
        this.size = "large";
      }
    });
  }

  ngOnInit(): void {
    this.event = this.data.event;

    console.log(this.event);
    this.calendar = this.data.calendar;
    this.url = window.location.hostname + ":" + window.location.port + "/event/" + this.calendar + "/" + this.event.id;

    this.countdown = this.coutndownService.getCountdown(this.event);
    console.log(this.countdown);

    this.interval = setInterval(() => this.countDown(), 1000);
  }

  toggleTime() {
    this.countdown.time = !this.countdown.time;
  }

  countDown() {
    if (this.countdown.type == "past") {
      this.countdown.seconds++;
    } else {
      this.countdown.seconds--;
    }

    this.countdown = this.coutndownService.editCountdown(
      this.countdown.type == "past" ? (
        this.event.end.dateTime == null ? new Date(this.event.end.date) :
          new Date(this.event.end.dateTime)) : (
          this.event.start.dateTime == null ? new Date(this.event.start.date) :
            new Date(this.event.start.dateTime
            )
        ),
      this.countdown
    )
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
