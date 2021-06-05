import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'

const formatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC'
}

@Component({
  selector: 'ui-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit {
  @Input() dates!: Date[]
  @Input() currentDate: Date
  @Output() currentDateChange = new EventEmitter<Date>()

  constructor() {}

  format(date: Date) {
    return date.toLocaleDateString(undefined, formatOptions)
  }

  setDate(date: Date): void {
    // this.currentDate = date
    this.currentDateChange.emit(date)
  }
  ngOnInit(): void {}
}
