import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CalendarService } from '../calendar.service';
import { EventDialogComponent } from '../event-dialog/event-dialog.component'

export interface Calendar {
  id: string;
}

@Component({
  selector: 'app-all-page',
  templateUrl: './all-page.component.html',
  styleUrls: ['./all-page.component.scss']
})
export class AllPageComponent implements OnInit {
  public calendars;
  public selected_calendar: Calendar;
  selected_color: string;

  public events;

  constructor(
    public authService: AuthService,
    private calendarService: CalendarService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  async ngOnInit() {
    if (await this.authService.checkIfUserAuthenticated()) {
      await this.get_primary_events();
      await this.get_calendars();
    }
  }

  async get_calendars() {
    this.calendarService.get_calendars().subscribe(res => {
      this.calendars = res;
      this.calendars.forEach(cal => {
        if (cal.primary == true) {
          this.selected_calendar = cal;
        }
      });
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

  openDialog(event) {
    let dialog = this.dialog.open(EventDialogComponent, {
      data: {
        event: event,
        calendar: this.selected_calendar.id
      }
    })
  }

  editEvent(event) {
    console.log('edit', event);
  }

  deleteEvent(event) {
    console.log('delete', event);
  }

}
