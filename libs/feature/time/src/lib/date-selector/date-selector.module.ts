import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { DateEffects } from './+state/date.effects'
import { DATE_FEATURE_KEY, reducer } from './+state/date.reducer'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(DATE_FEATURE_KEY, reducer),
    EffectsModule.forFeature([DateEffects]),
  ],
})
export class DateSelectorModule {}
