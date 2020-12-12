import { Component, Inject, InjectionToken } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';



@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string
  ) { }


  ngOnInit() {
    console.log(this.data);
  }

}
