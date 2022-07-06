import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppState, RAINCELL_FEATURE_KEY } from './raincell.reducer'

export const getRaincellState =
  createFeatureSelector<AppState>(RAINCELL_FEATURE_KEY)

export const getRaincellDate = createSelector(
  getRaincellState,
  (state: AppState) => state.date
)
