import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DatePickerComponent } from './components/date-picker/date-picker.component'

@NgModule({
  imports: [CommonModule],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
})
export class UiTimeModule {}
