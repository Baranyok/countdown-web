import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      console.log(res);
      this.calendarService.get_event(res.cal, res.event);
    });
  }

}
