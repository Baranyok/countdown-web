import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CalendarService } from '../calendar.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoBarComponent } from '../info-bar/info-bar.component';

interface myEvent {
  name: string,
  description: string,
  start: {
    date?: string,
    dateTime?: Date,
  },
  end: {
    date?: string,
    dateTime?: Date,
  }
}

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  public eventForm;
  public isUser = false;
  public size: string;

  public calendars;
  private calendar;
  private event: myEvent;

  constructor(
    public authService: AuthService,
    private calendarService: CalendarService,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar

  ) {
    this.eventForm = this.formBuilder.group({
      eventName: '',
      eventCalendar: '',
      eventStart: '',
      eventStartTime: '',
      eventEnd: '',
      eventEndTime: '',
      eventDesc: '',
    })

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
  async ngOnInit() {
    if (await this.authService.isUser()) {
      this.calendarService.get_calendars().subscribe((res) => {
        this.calendars = res;
        this.isUser = true;
      })
    }
  }

  formatDate(date: Date) {
    let formated = date.getFullYear().toString();
    formated = formated.concat('-', (date.getMonth() + 1).toString());
    formated = formated.concat('-', date.getDate().toString());
    console.log(formated);
    return formated;
  }

  setStartTime(res: any) {
    let date: Date = res.value;
    this.eventForm.controls.eventStartTime.value = date.getHours().toString() + ':' + date.getMinutes().toString();
  }

  setEndTime(res: any) {
    let date: Date = res.value;
    this.eventForm.controls.eventEndTime.value = date.getHours().toString() + ':' + date.getMinutes().toString();
  }

  setEvent() {
    this.event = {
      name: '',
      description: '',
      start: {},
      end: {}
    };
    this.event.name = this.eventForm.controls.eventName.value;
    this.event.description = this.eventForm.controls.eventDesc.value;

    if (this.eventForm.controls.eventStartTime.value !== "" && this.eventForm.controls.eventEndTime !== "") {
      this.event.start.dateTime = new Date(this.eventForm.controls.eventStart.value);

      this.event.start.dateTime.setHours(this.eventForm.controls.eventStartTime.value.split(':')[0]);
      this.event.start.dateTime.setMinutes(this.eventForm.controls.eventStartTime.value.split(':')[1]);

      this.event.end.dateTime = new Date(this.eventForm.controls.eventEnd.value);

      this.event.end.dateTime.setHours(this.eventForm.controls.eventEndTime.value.split(':')[0]);
      this.event.end.dateTime.setMinutes(this.eventForm.controls.eventEndTime.value.split(':')[1]);
    } else {
      this.event.end.date = this.formatDate(new Date(this.eventForm.controls.eventEnd.value));
      this.event.start.date = this.formatDate(new Date(this.eventForm.controls.eventStart.value));
    }
    console.log(this.eventForm.controls);
    this.calendar = this.eventForm.controls.eventCalendar.value;

  }

  onSubmit() {
    if (this.eventForm.status === "VALID") {
      this.setEvent();

      this.calendarService.add_event(
        this.event,
        this.calendar
      ).subscribe((res: myEvent) => {
        this.event = res;
        this.snackBar.openFromComponent(InfoBarComponent, {
          data: "Event added",
          duration: 2000
        });

      })
    }
  }

  showCountdown() {
    if (this.eventForm.statur === "VALID") {
      this.setEvent();
    }
  }
}
