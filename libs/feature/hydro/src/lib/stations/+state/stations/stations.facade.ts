import { Injectable } from '@angular/core'

import { select, Store, Action } from '@ngrx/store'

import * as StationsActions from './stations.actions'
import * as StationsFeature from './stations.reducer'
import * as StationsSelectors from './stations.selectors'

@Injectable()
export class StationsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(StationsSelectors.getStationsLoaded))
  allStations$ = this.store.pipe(select(StationsSelectors.getAllStations))
  selectedStations$ = this.store.pipe(select(StationsSelectors.getSelected))

  constructor(private store: Store) {}

  init() {
    this.store.dispatch(StationsActions.init())
  }

  selectStation(selectedId: number) {
    this.store.dispatch(StationsActions.selectStation({ selectedId }))
  }
}
