import { Action, createReducer, on } from '@ngrx/store'

import * as StationDataActions from './station-data.actions'
import { StationDataModel } from './station-data.models'

export const STATIONDATA_FEATURE_KEY = 'stationData'

export interface State {
  stationData?: StationDataModel
  loaded: boolean
  error?: string | null
}

export interface StationDataPartialState {
  readonly [STATIONDATA_FEATURE_KEY]: State
}

export const initialState: State = {
  loaded: false,
}

const stationDataReducer = createReducer(
  initialState,
  on(StationDataActions.loadStationData, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(StationDataActions.loadStationDataSuccess, (state, { stationData }) => ({
    ...state,
    stationData,
  })),
  on(StationDataActions.loadStationDataFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)

export function reducer(state: State | undefined, action: Action) {
  return stationDataReducer(state, action)
}
