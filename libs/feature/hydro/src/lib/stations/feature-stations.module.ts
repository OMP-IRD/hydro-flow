import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromStations from './+state/stations/stations.reducer'
import { StationsEffects } from './+state/stations/stations.effects'
import { StationsFacade } from './+state/stations/stations.facade'
import * as fromStationData from './+state/station-data/station-data.reducer'
import { StationDataEffects } from './+state/station-data/station-data.effects'
import { StationDataFacade } from './+state/station-data/station-data.facade'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromStations.STATIONS_FEATURE_KEY,
      fromStations.reducer
    ),
    EffectsModule.forFeature([StationsEffects]),
    StoreModule.forFeature(
      fromStationData.STATIONDATA_FEATURE_KEY,
      fromStationData.reducer
    ),
    EffectsModule.forFeature([StationDataEffects]),
  ],
  declarations: [],
  exports: [],
  providers: [StationsFacade, StationDataFacade],
})
export class FeatureStationsModule {}
