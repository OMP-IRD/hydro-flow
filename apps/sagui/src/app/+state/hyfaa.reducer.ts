import { HyfaaDataSerie, HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { Action, createReducer, on } from '@ngrx/store'

import * as HyfaaActions from './hyfaa.actions'

export const HYFAA_FEATURE_KEY = 'hyfaa'

export interface AppState {
  dataSerie: HyfaaDataSerie
  segmentFocus: HyfaaSegmentFocus
}

export const initialState: AppState = {
  dataSerie: 'mgbstandard',
  segmentFocus: 'flow',
}

const hyfaaReducer = createReducer(
  initialState,
  on(HyfaaActions.setDataSerie, (state, { dataSerie }) => ({
    ...state,
    dataSerie,
  })),
  on(HyfaaActions.setSegmentFocus, (state, { segmentFocus }) => ({
    ...state,
    segmentFocus,
  }))
)

export function reducer(state: AppState | undefined, action: Action) {
  return hyfaaReducer(state, action)
}
