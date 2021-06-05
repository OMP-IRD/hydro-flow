import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BGTogglerComponent } from './components/bg-toggler/bg-toggler.component'

@NgModule({
  declarations: [BGTogglerComponent],
  imports: [CommonModule],
  exports: [BGTogglerComponent],
})
export class FeatureMapModule {}
