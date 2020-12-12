import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CalendarService } from '../calendar.service';
import { CountdownService } from '../countdown.service';
import { Countdown, Event } from '../event-dialog/event-dialog.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  public countdown: Countdown;
  public event;
  private interval;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private calendarService: CalendarService,
    private countdownService: CountdownService,
  ) { }

  async ngOnInit() {
    if (await this.authService.checkIfUserAuthenticated()) {

      await this.route.params.subscribe((res) => {
        this.getEvent(res.cal, res.event);
      });

      console.log(this.countdown);

      this.interval = setInterval(() => this.countDown(), 1000);

    }
  }

  getEvent(cal, event) {
    this.calendarService.get_event(cal, event).subscribe(res => {
      this.event = res;

      this.countdown = this.countdownService.getCountdown(this.event);
    })
  }

  countDown() {
    if (this.countdown.type == "past") {
      this.countdown.seconds++;
    } else {
      this.countdown.seconds--;
    }

    this.countdown = this.countdownService.editCountdown(
      this.countdown.type == "past" ? (
        this.event.end.dateTime == null ? new Date(this.event.end.date) :
          new Date(this.event.end.dateTime)) : (
          this.event.start.dateTime == null ? new Date(this.event.start.date) :
            new Date(this.event.start.dateTime
            )
        ),
      this.countdown
    )
  }


  toggleTime() {
    this.countdown.time = !this.countdown.time;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }


}


