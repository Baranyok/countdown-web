import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CalendarService } from '../calendar.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  public eventForm;
  public isUser = false;
  public size: string;

  constructor(
    public authService: AuthService,
    private calendarService: CalendarService,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {
    this.eventForm = this.formBuilder.group({
      eventName: '',
      eventStart: '',
      eventEnd: '',
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
      this.isUser = true;
    }
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
      let desc = this.eventForm.controls.eventDesc.value;
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
        'description': desc
      }

      this.calendarService.add_event(
        event
      );
    } else {
      console.log("Form invalid");
    }
  }

  showCountdown() {
    console.log('countdown');
  }
}
