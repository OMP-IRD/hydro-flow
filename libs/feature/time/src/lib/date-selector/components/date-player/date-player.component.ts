import { ChangeDetectionStrategy, Component } from '@angular/core'
import { take } from 'rxjs/operators'
import { DateFacade } from '../../+state'

@Component({
  selector: 'hydro-flow-date-player',
  templateUrl: './date-player.component.html',
  styleUrls: ['./date-player.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePlayerComponent {
  constructor(public facade: DateFacade) {}

  onDateChange(date: Date): void {
    this.facade.setCurrentDate(date)
  }
  onAnimatorIndexChange(index: number): void {
    this.facade.dates$
      .pipe(take(1))
      .subscribe((dates) => dates && this.facade.setCurrentDate(dates[index]))
  }
}
