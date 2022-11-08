import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SafePipe } from './pipe/SafePipe'

@NgModule({
  declarations: [SafePipe],
  imports: [CommonModule],
  exports: [SafePipe],
})
export class FeatureSharedModule {}
