import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

const formatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC',
}

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

  format(date: Date) {
    return date.toLocaleDateString(undefined, formatOptions as any)
  }

  setDate(date: Date): void {
    // this.currentDate = date
    this.currentDateChange.emit(date)
  }
}
