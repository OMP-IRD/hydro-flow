import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'

import * as StationDataActions from './station-data.actions'
import { LoadStationDataOptionsModel } from './station-data.models'
import * as StationDataSelectors from './station-data.selectors'

@Injectable()
export class StationDataFacade {
  loaded$ = this.store.pipe(select(StationDataSelectors.getStationDataLoaded))
  stationData$ = this.store.pipe(select(StationDataSelectors.getStationData))

  constructor(private store: Store) {}

  loadStationData(stationId: number, options?: LoadStationDataOptionsModel) {
    this.store.dispatch(
      StationDataActions.loadStationData({ stationId, options })
    )
  }
}
