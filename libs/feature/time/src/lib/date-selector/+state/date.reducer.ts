import { Action, createReducer, on } from '@ngrx/store'
import { setCurrentDate, setDates } from './date.actions'

export const DATE_FEATURE_KEY = 'date-selector'

export interface AppState {
  dates?: Date[]
  date?: Date
}
export const initialState: AppState = {}

const dateReducer = createReducer(
  initialState,
  on(setDates, (state, { dates }) => ({ ...state, dates })),
  on(setCurrentDate, (state, { date }) => ({ ...state, date }))
)

export function reducer(state: AppState | undefined, action: Action) {
  return dateReducer(state, action)
}
