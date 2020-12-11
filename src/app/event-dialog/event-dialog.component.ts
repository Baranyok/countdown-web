import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Event {
  summary: string;
  id: string;
}


@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {
  url: string;
  private calendar: string;
  public event: Event;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    this.event = this.data.event;
    this.calendar = this.data.calendar;
    this.url = window.location.hostname + ":" + window.location.port + "/event/" + this.calendar + "/" + this.event.id;
  }



}
