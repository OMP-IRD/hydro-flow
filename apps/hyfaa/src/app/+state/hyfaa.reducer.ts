import { Action, createReducer, on } from '@ngrx/store'

import * as HyfaaActions from './hyfaa.actions'

export const HYFAA_FEATURE_KEY = 'hyfaa'

export interface AppState {
  dates?: Date[]
  date?: Date
  stationId?: number
  stationData?: any
}

export const initialState: AppState = {}

const hyfaaReducer = createReducer(
  initialState,
  on(HyfaaActions.setDates, (state, { dates }) => ({ ...state, dates })),
  on(HyfaaActions.setCurrentDate, (state, { date }) => ({ ...state, date })),
  on(HyfaaActions.setStationId, (state, { stationId }) => ({
    ...state,
    stationId,
  })),
  on(HyfaaActions.setStationData, (state, { stationData }) => ({
    ...state,
    stationData,
  }))
)

export function reducer(state: AppState | undefined, action: Action) {
  return hyfaaReducer(state, action)
}
