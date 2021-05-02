import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromStations from './+state/stations/stations.reducer'
import { StationsEffects } from './+state/stations/stations.effects'
import { StationsFacade } from './+state/stations/stations.facade'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromStations.STATIONS_FEATURE_KEY,
      fromStations.reducer
    ),
    EffectsModule.forFeature([StationsEffects]),
  ],
  declarations: [],
  exports: [],
  providers: [StationsFacade],
})
export class FeatureStationsModule {}
