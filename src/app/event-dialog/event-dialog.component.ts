import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountdownService } from '../countdown.service';

export interface Event {
  summary: string;
  id: string;
}

export interface Countdown {
  days: number,
  months: number,
  years: number,

  type: string,
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private coutndownService: CountdownService
  ) { }

  ngOnInit(): void {
    this.event = this.data.event;
    this.calendar = this.data.calendar;
    this.url = window.location.hostname + ":" + window.location.port + "/event/" + this.calendar + "/" + this.event.id;

    this.countdown = this.coutndownService.getCountdown(this.event);
    console.log(this.countdown);
  }



}
