import { createFeatureSelector, createSelector } from '@ngrx/store'
import {
  State,
  STATIONDATA_FEATURE_KEY,
  StationDataPartialState,
} from './station-data.reducer'

export const getStationDataState = createFeatureSelector<State>(
  STATIONDATA_FEATURE_KEY
)

export const getStationDataLoaded = createSelector(
  getStationDataState,
  (state: State) => state.loaded
)

export const getStationDataError = createSelector(
  getStationDataState,
  (state: State) => state.error
)

export const getStationData = createSelector(
  getStationDataState,
  (state: State) => state.stationData
)
