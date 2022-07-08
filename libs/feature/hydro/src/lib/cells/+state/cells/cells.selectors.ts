import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CELLS_FEATURE_KEY, State } from './cells.reducer'

export const getCellsState = createFeatureSelector<State>(CELLS_FEATURE_KEY)

export const getCellsLoaded = createSelector(
  getCellsState,
  (state: State) => state.loaded
)

export const getCellsError = createSelector(
  getCellsState,
  (state: State) => state.error
)

export const getCellsFeature = createSelector(
  getCellsState,
  (state: State) => state.feature
)
