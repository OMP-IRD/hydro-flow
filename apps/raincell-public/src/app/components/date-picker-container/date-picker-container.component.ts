import { Component } from '@angular/core'
import { RaincellFacade } from '../../+state/raincell.facade'

@Component({
  selector: 'raincell-date-picker-container',
  templateUrl: './date-picker-container.component.html',
  styleUrls: ['./date-picker-container.component.scss'],
})
export class DatePickerContainerComponent {
  constructor(public facade: RaincellFacade) {}
}
