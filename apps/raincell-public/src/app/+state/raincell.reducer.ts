import { Action, createReducer, on } from '@ngrx/store'
import { setDate } from './raincell.actions'

export const RAINCELL_FEATURE_KEY = 'raincell'

export interface AppState {
  date?: Date
}

export const initialState: AppState = {}

const raincellReducer = createReducer(
  initialState,
  on(setDate, (state, { date }) => ({
    ...state,
    date,
  }))
)

export function reducer(state: AppState | undefined, action: Action) {
  return raincellReducer(state, action)
}