import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DatePickerComponent } from './components/date-picker/date-picker.component'
import { AnimatorComponent } from './components/animator/animator.component'

@NgModule({
  imports: [CommonModule],
  declarations: [DatePickerComponent, AnimatorComponent],
  exports: [DatePickerComponent, AnimatorComponent],
})
export class UiTimeModule {}
