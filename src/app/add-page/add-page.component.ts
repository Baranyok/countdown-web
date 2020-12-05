import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CalendarService } from '../calendar.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  eventForm;
  auth_token;

  constructor(
    public auth: AppComponent,
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
    this.auth_token = this.auth.authInstance.currentUser.get().getAuthResponse().access_token;
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
        this.auth_token,
        "",
        event
      );
    } else {
      console.log("Form invalid");
    }
  }
}
