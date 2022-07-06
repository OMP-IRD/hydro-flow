import { Component, OnInit } from '@angular/core'
import { DateFacade } from '@hydro-flow/feature/time'
import { take } from 'rxjs/operators'

@Component({
  selector: 'raincell-time-player',
  templateUrl: './time-player.component.html',
  styleUrls: ['./time-player.component.scss'],
})
export class TimePlayerComponent {
  constructor(public facade: DateFacade) {}

  onDateChange(date: Date): void {
    this.facade.setCurrentDate(date)
  }
  onAnimatorIndexChange(index: number): void {
    this.facade.dates$
      .pipe(take(1))
      .subscribe((dates) => this.facade.setCurrentDate(dates[index]))
  }
}
