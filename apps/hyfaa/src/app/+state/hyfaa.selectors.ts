import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppState, HYFAA_FEATURE_KEY } from './hyfaa.reducer'

export const getHyfaaState = createFeatureSelector<AppState>(HYFAA_FEATURE_KEY)

export const getHyfaaDates = createSelector(
  getHyfaaState,
  (state: AppState) => state.dates
)

export const getHyfaaDate = createSelector(
  getHyfaaState,
  (state: AppState) => state.date
)

export const getDataSerie = createSelector(
  getHyfaaState,
  (state: AppState) => state.dataSerie
)

export const getSegmentFocus = createSelector(
  getHyfaaState,
  (state: AppState) => state.segmentFocus
)
