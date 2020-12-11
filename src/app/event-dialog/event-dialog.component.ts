import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { worker } from 'cluster';

export interface Event {
  event: Event;
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public event: Event,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.event = this.event.event;
    this.url = window.location.hostname + ":" + window.location.port + "/event/" + this.event.id;
  }



}
