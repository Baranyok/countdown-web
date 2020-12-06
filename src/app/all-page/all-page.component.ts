import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth.service';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-all-page',
  templateUrl: './all-page.component.html',
  styleUrls: ['./all-page.component.scss']
})
export class AllPageComponent implements OnInit {
  public calendars;
  selected_calendar;
  selected_color: string;

  public events;

  constructor(
    public authService: AuthService,
    private calendarService: CalendarService) { }

  async ngOnInit() {
    if (await this.authService.checkIfUserAuthenticated()) {
      this.get_primary_events();
      this.get_calendars();
    }
  }

  async get_calendars() {
    this.calendarService.get_calendars().subscribe(res => {
      this.calendars = res;
      this.selected_calendar = res[0];
    });
  }

  async get_events() {
    this.calendarService.get_events(this.selected_calendar.id).subscribe(res => {
      this.events = res;
      console.log(this.events);
    });
  }

  async get_primary_events() {
    this.calendarService.get_primary_events().subscribe(res => {
      this.events = res;
      console.log(this.events);
    });
  }

  set_calendar(calendar) {
    let colors = [
      "#000",
      "#039be5", "#7986cb", "#33b679", "#8e24aa", "#e67c73", "#f6c026",
      "#f5511d", "#039be5", ",#616161", "#3f51b5", "#0b8043", "#d60000"
    ];

    this.selected_calendar = calendar;
    this.selected_color = colors[calendar.color];
    this.get_events();
  }

}
