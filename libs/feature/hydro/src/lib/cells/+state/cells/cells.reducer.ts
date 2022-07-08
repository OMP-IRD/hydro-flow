import { Action, createReducer, on } from '@ngrx/store'
import Feature from 'ol/Feature'
import * as CellsActions from './cells.actions'

export const CELLS_FEATURE_KEY = 'cells'

export interface State {
  feature?: Feature
  loaded: boolean
  error?: string | null
}

export interface CellsPartialState {
  readonly [CELLS_FEATURE_KEY]: State
}

export const initialState: State = {
  loaded: false,
}

const cellsReducer = createReducer(
  initialState,
  on(CellsActions.loadCellsSuccess, (state, { feature }) => ({
    ...state,
    feature,
    loaded: true,
  })),
  on(CellsActions.loadCellsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CellsActions.load, (state, { id }) => ({
    ...state,
    loaded: false,
    error: null,
  }))
)

export function reducer(state: State | undefined, action: Action) {
  return cellsReducer(state, action)
}
