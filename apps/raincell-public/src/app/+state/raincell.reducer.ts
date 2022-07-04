import { Action, createReducer, on } from '@ngrx/store'
import { setActive } from './raincell.actions'

export const RAINCELL_FEATURE_KEY = 'raincell'

export interface AppState {
  active: string
}

export const initialState: AppState = {
  active: undefined,
}

const raincellReducer = createReducer(
  initialState,
  on(setActive, (state, { active }) => ({
    ...state,
    active,
  }))
)

export function reducer(state: AppState | undefined, action: Action) {
  return raincellReducer(state, action)
}
