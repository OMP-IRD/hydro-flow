import { Action, createReducer, on } from '@ngrx/store'
import Feature from 'ol/Feature'
import { RaincellFrequence } from '../../api/cells.model'
import { setFrequence } from './cells.actions'
import * as CellsActions from './cells.actions'

export const CELLS_FEATURE_KEY = 'cells'

export interface State {
  feature?: Feature
  loaded: boolean
  error?: string | null
  frequence: RaincellFrequence
}

export interface CellsPartialState {
  readonly [CELLS_FEATURE_KEY]: State
}

export const initialState: State = {
  loaded: false,
  frequence: 'min',
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
  on(CellsActions.setFrequence, (state, { frequence }) => ({
    ...state,
    loaded: false,
    frequence,
  })),
  on(CellsActions.load, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CellsActions.reset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    feature: null,
  }))
)

export function reducer(state: State | undefined, action: Action) {
  return cellsReducer(state, action)
}
