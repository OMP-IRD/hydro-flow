import { HyfaaDataSerie, HyfaaSegmentFocus } from '@hydro-flow/feature/hydro'
import { Action, createReducer, on } from '@ngrx/store'
import { SAGUI_TAB_TYPES, SaguiTab } from '../ui/ui.model'

import * as SaguiActions from './sagui.actions'

export const SAGUI_FEATURE_KEY = 'sagui'

export interface AppState {
  dataSerie: HyfaaDataSerie
  segmentFocus: HyfaaSegmentFocus
  tab?: SaguiTab
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
  })),
  on(SaguiActions.setTab, (state, { tab }) => ({
    ...state,
    tab,
  }))
)

export function reducer(state: AppState | undefined, action: Action) {
  return saguiReducer(state, action)
}
