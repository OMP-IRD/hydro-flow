import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'

@Component({
  selector: 'ui-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit {
  @Input() dates: Date[] = [new Date('10/23/2020')]

  constructor() {}

  ngOnInit(): void {}
}
