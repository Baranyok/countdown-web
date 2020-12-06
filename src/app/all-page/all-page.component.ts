import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-all-page',
  templateUrl: './all-page.component.html',
  styleUrls: ['./all-page.component.scss']
})
export class AllPageComponent implements OnInit {
  public calendars;
  selected_cal;
  selected_color: string;

  public events;

  constructor(
    public authService: AuthService,
    private cal: CalendarService) { }

  async ngOnInit() {
    if (await this.authService.isUser()) {
      this.get();
    }
  }

  async get() {
    if (!this.calendars) {
      this.cal.get_calendars().subscribe(res => {
        this.calendars = res;
        this.selected_cal = res[0];
      });
    }
  }

  async get_events() {
    console.log(this.selected_cal.id);
    if (this.selected_cal != null) {
      this.cal.get_events(this.selected_cal.id).subscribe(res => {
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
