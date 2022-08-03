import { HyfaaDataSerie, HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { Action, createReducer, on } from '@ngrx/store'

import * as SaguiActions from './sagui.actions'

export const SAGUI_FEATURE_KEY = 'sagui'

export interface AppState {
  dataSerie: HyfaaDataSerie
  segmentFocus: HyfaaSegmentFocus
}

export const initialState: AppState = {
  dataSerie: 'mgbstandard',
  segmentFocus: 'flow',
}

const saguiReducer = createReducer(
  initialState,
  on(SaguiActions.setDataSerie, (state, { dataSerie }) => ({
    ...state,
    dataSerie,
  })),
  on(SaguiActions.setSegmentFocus, (state, { segmentFocus }) => ({
    ...state,
    segmentFocus,
  }))
)

export function reducer(state: AppState | undefined, action: Action) {
  return saguiReducer(state, action)
}
