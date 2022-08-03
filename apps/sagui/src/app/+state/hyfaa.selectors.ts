import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppState, HYFAA_FEATURE_KEY } from './hyfaa.reducer'

export const getHyfaaState = createFeatureSelector<AppState>(HYFAA_FEATURE_KEY)

export const getDataSerie = createSelector(
  getHyfaaState,
  (state: AppState) => state.dataSerie
)

export const getSegmentFocus = createSelector(
  getHyfaaState,
  (state: AppState) => state.segmentFocus
)
