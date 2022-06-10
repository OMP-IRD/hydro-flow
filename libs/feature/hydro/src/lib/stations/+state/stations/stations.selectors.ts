import { createFeatureSelector, createSelector } from '@ngrx/store'
import {
  STATIONS_FEATURE_KEY,
  State,
  StationsPartialState,
  stationsAdapter,
} from './stations.reducer'

// Lookup the 'Stations' feature state managed by NgRx
export const getStationsState = createFeatureSelector<
  State
>(STATIONS_FEATURE_KEY)

const { selectAll, selectEntities } = stationsAdapter.getSelectors()

export const getStationsLoaded = createSelector(
  getStationsState,
  (state: State) => state.loaded
)

export const getStationsError = createSelector(
  getStationsState,
  (state: State) => state.error
)

export const getAllStations = createSelector(getStationsState, (state: State) =>
  selectAll(state)
)

export const getStationsEntities = createSelector(
  getStationsState,
  (state: State) => selectEntities(state)
)

export const getSelectedId = createSelector(
  getStationsState,
  (state: State) => state.selectedId
)

export const getSelected = createSelector(
  getStationsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
)
