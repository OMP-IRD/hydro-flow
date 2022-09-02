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
  @Input() dates!: string[]
  @Input() currentDate: string
  @Output() currentDateChange = new EventEmitter<string>()

  get sortedDates() {
    return [...this.dates].reverse()
  }
  constructor(
    @Inject(DATEPICKER_CONFIG)
    private dateFormatOptions: Intl.DateTimeFormatOptions
  ) {}
  format(date: string) {
    return new Date(date).toLocaleDateString(undefined, this.dateFormatOptions)
  }

  setDate(date: string): void {
    this.currentDateChange.emit(date)
  }
}
