import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-all-page',
  templateUrl: './all-page.component.html',
  styleUrls: ['./all-page.component.scss']
})
export class AllPageComponent implements OnInit {

  private auth_token;

  public calendars;
  selected_cal;
  selected_color: string;

  public events;

  constructor(
    public auth: AppComponent,
    private cal: CalendarService) { }

  async ngOnInit() {
    if (await this.auth.checkIfUserAuthenticated()) {
      this.auth_token = this.auth.authInstance.currentUser.get().getAuthResponse().access_token;
      this.get();
    }
  }

  async get() {
    if (!this.calendars) {
      this.cal.get_calendars(this.auth_token).subscribe(res => {
        this.calendars = res;
        this.selected_cal = res[0];
      });
    }
  }

  async get_events() {
    console.log(this.selected_cal.id);
    if (this.selected_cal && this.auth_token) {
      this.cal.get_events(this.auth_token, this.selected_cal.id).subscribe(res => {
        this.events = res;
        console.log(this.events);
      });
    }
  }

  set_cal(cal) {
    let colors = [
      "#000",
      "#039be5", "#7986cb", "#33b679", "#8e24aa", "#e67c73", "#f6c026",
      "#f5511d", "#039be5", ",#616161", "#3f51b5", "#0b8043", "#d60000"
    ];

    this.selected_cal = cal;
    this.selected_color = colors[cal.color];
    this.get_events();

  }

}
