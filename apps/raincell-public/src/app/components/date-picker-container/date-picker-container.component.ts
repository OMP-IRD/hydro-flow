import { Component } from '@angular/core'
import { DateFacade } from '@hydro-flow/feature/time'
import { take } from 'rxjs/operators'

@Component({
  selector: 'raincell-date-picker-container',
  templateUrl: './date-picker-container.component.html',
  styleUrls: ['./date-picker-container.component.scss'],
})
export class DatePickerContainerComponent {
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
