import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { CellsEffects } from './+state/cells/cells.effects'
import { CellsFacade } from './+state/cells/cells.facade'
import * as fromcells from './+state/cells/cells.reducer'
import { FrequenceSelectorComponent } from './components/frequence-selector/frequence-selector.component'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromcells.CELLS_FEATURE_KEY, fromcells.reducer),
    EffectsModule.forFeature([CellsEffects]),
  ],
  declarations: [FrequenceSelectorComponent],
  exports: [FrequenceSelectorComponent],
  providers: [CellsFacade],
})
export class FeatureCellsModule {}
