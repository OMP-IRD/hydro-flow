import { HyfaaDataSerie } from '@hydro-flow/feature/hydro'
import { Action, createReducer, on } from '@ngrx/store'

import * as HyfaaActions from './hyfaa.actions'

export const HYFAA_FEATURE_KEY = 'hyfaa'

export interface AppState {
  dates?: Date[]
  date?: Date
  dataSerie: HyfaaDataSerie
}

export const initialState: AppState = {
  dataSerie: 'mgbstandard',
}

const hyfaaReducer = createReducer(
  initialState,
  on(HyfaaActions.setDates, (state, { dates }) => ({ ...state, dates })),
  on(HyfaaActions.setCurrentDate, (state, { date }) => ({ ...state, date })),
  on(HyfaaActions.setDataSerie, (state, { dataSerie }) => ({
    ...state,
    dataSerie,
  }))
)

export function reducer(state: AppState | undefined, action: Action) {
  return hyfaaReducer(state, action)
}
