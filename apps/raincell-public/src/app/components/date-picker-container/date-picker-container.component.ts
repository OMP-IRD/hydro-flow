import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { RaincellFacade } from '../../+state/raincell.facade'

@Component({
  selector: 'raincell-date-picker-container',
  templateUrl: './date-picker-container.component.html',
  styleUrls: ['./date-picker-container.component.scss'],
})
export class DatePickerContainerComponent implements OnInit {
  dateControl = new FormControl(new Date())
  constructor(public facade: RaincellFacade) {}

  onDateChange(event) {
    this.facade.setDate(event.value)
  }

  ngOnInit(): void {
    this.facade.date$.subscribe((date) => {
      this.dateControl.patchValue(date)
    })
  }
}
