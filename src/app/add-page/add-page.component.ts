import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CalendarService } from '../calendar.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  eventForm;

  constructor(
    public authService: AuthService,
    private calendarService: CalendarService,
    private formBuilder: FormBuilder
  ) {
    this.eventForm = this.formBuilder.group({
      eventName: '',
      eventStart: '',
      eventEnd: ''
    })
  }
  ngOnInit() {
  }

  formatDate(date: Date) {
    let formated = date.getFullYear().toString();
    formated = formated.concat('-', (date.getMonth() + 1).toString());
    formated = formated.concat('-', date.getDate().toString());
    console.log(formated);
    return formated;
  }

  onSubmit() {
    if (this.eventForm.status === "VALID") {
      let name = this.eventForm.controls.eventName.value;
      let start = new Date(this.eventForm.controls.eventStart.value);
      let end = new Date(this.eventForm.controls.eventEnd.value);

      let event = {
        'start': {
          'date': this.formatDate(start),
        },
        'end': {
          'date': this.eventForm.controls.eventEnd.value === "" ? this.formatDate(start) : this.formatDate(end),
        },
        'summary': name,
      }

      this.calendarService.add_event(
        event
      );
    } else {
      console.log("Form invalid");
    }
  }
}
