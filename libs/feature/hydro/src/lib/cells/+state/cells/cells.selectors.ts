import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CELLS_FEATURE_KEY, cellsAdapter, State } from './cells.reducer'

export const getCellsState = createFeatureSelector<State>(CELLS_FEATURE_KEY)

const { selectAll, selectEntities } = cellsAdapter.getSelectors()

export const getCellsLoaded = createSelector(
  getCellsState,
  (state: State) => state.loaded
)

export const getCellsError = createSelector(
  getCellsState,
  (state: State) => state.error
)

export const getCellsDate = createSelector(
  getCellsState,
  (state: State) => state.date
)

export const getAllCells = createSelector(getCellsState, (state: State) =>
  selectAll(state)
)

export const getCellsEntities = createSelector(getCellsState, (state: State) =>
  selectEntities(state)
)

export const getSelectedCellId = createSelector(
  getCellsState,
  (state: State) => state.selectedId
)

export const getSelectedCell = createSelector(
  getCellsEntities,
  getSelectedCellId,
  (entities, selectedId) => selectedId && entities[selectedId]
)
