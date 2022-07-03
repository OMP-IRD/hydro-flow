import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppState, DATE_FEATURE_KEY } from './date.reducer'

export const getDateState = createFeatureSelector<AppState>(DATE_FEATURE_KEY)

export const getDateDates = createSelector(
  getDateState,
  (state: AppState) => state.dates
)

export const getDateDate = createSelector(
  getDateState,
  (state: AppState) => state.date
)
