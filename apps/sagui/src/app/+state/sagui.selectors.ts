import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppState, SAGUI_FEATURE_KEY } from './sagui.reducer'

export const getSaguiState = createFeatureSelector<AppState>(SAGUI_FEATURE_KEY)

export const getDataSerie = createSelector(
  getSaguiState,
  (state: AppState) => state.dataSerie
)

export const getSegmentFocus = createSelector(
  getSaguiState,
  (state: AppState) => state.segmentFocus
)
