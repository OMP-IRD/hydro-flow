import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiTimeModule } from '@hydro-flow/ui/time'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { DateEffects } from './+state/date.effects'
import { DATE_FEATURE_KEY, reducer } from './+state/date.reducer'
import { DatePlayerComponent } from './components/date-player/date-player.component'

@NgModule({
  imports: [
    CommonModule,
    UiTimeModule,
    StoreModule.forFeature(DATE_FEATURE_KEY, reducer),
    EffectsModule.forFeature([DateEffects]),
  ],
  declarations: [DatePlayerComponent],
  exports: [DatePlayerComponent],
})
export class DateSelectorModule {}
