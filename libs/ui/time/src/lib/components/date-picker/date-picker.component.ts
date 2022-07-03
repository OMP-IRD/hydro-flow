import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  Output,
} from '@angular/core'

export const DATEPICKER_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}
export const DATEPICKER_CONFIG = new InjectionToken<Intl.DateTimeFormatOptions>(
  'datepicker.config'
)

@Component({
  selector: 'ui-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  @Input() dates!: Date[]
  @Input() currentDate: Date
  @Output() currentDateChange = new EventEmitter<Date>()

  constructor(
    @Inject(DATEPICKER_CONFIG)
    private dateFormatOptions: Intl.DateTimeFormatOptions
  ) {}
  format(date: Date) {
    return date.toLocaleDateString(undefined, this.dateFormatOptions)
  }

  setDate(date: Date): void {
    // this.currentDate = date
    this.currentDateChange.emit(date)
  }
}
