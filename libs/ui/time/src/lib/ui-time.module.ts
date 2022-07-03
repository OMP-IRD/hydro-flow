import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  DATEPICKER_CONFIG,
  DATEPICKER_FORMAT_OPTIONS,
  DatePickerComponent,
} from './components/date-picker/date-picker.component'
import { AnimatorComponent } from './components/animator/animator.component'

@NgModule({
  imports: [CommonModule],
  declarations: [DatePickerComponent, AnimatorComponent],
  exports: [DatePickerComponent, AnimatorComponent],
  providers: [
    {
      provide: DATEPICKER_CONFIG,
      useValue: DATEPICKER_FORMAT_OPTIONS,
    },
  ],
})
export class UiTimeModule {}
