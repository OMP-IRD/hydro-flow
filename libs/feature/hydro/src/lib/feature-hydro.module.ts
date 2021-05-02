import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChartModalComponent } from './charts/chart-modal/chart-modal.component'

@NgModule({
  imports: [CommonModule],
  declarations: [ChartModalComponent],
  exports: [ChartModalComponent],
})
export class FeatureHydroModule {}
