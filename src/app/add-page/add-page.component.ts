import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  private auth_token;

  public calendars;
  selected_cal: string;

  constructor(
    private auth: AppComponent,
    private cal: CalendarService) { }

  async ngOnInit() {
    if (await this.auth.checkIfUserAuthenticated()) {
      this.auth_token = this.auth.authInstance.currentUser.get().getAuthResponse().access_token;
    }
  }

  async get() {
    if (!this.calendars) {
      this.cal.get(this.auth_token).subscribe(res => {
        this.calendars = res;
      });
    }
  }

  set_cal(cal) {
    console.log(cal);
  }
}
